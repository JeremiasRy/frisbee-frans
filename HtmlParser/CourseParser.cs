using HtmlAgilityPack;
using System.Linq;
using System.Text.RegularExpressions;
using System.Xml.Linq;

namespace HtmlParser;

public class CourseParser
{
    readonly HtmlDocument _doc;
    readonly Regex _newLineTab = new(@"[\n\t]+");
    readonly Regex _numberAfterString = new(@"\w+\s(\d*)");
    readonly Regex _holeLength = new(@"Pituus\s(\d*)");
    readonly Regex _holePar = new(@"Par\s(\d*)");

    public Course ReturnCourse()
    {
        Course course = new Course();
        ReadCourseHoles(course);
        ReadCourseInfo(course);
        ReadCourseName(course);
        ReadCourseGrade(course);
        return course;
    }

    void ReadCourseGrade(Course course)
    {
        var imgNode = _doc.DocumentNode.Descendants("img").Where(node => node.GetClasses().Any(cssClass => cssClass.Contains("rating_image"))).FirstOrDefault();
        if (imgNode is null)
        {
            Console.WriteLine("Did not find grade");
            return;
        }
        string grade = imgNode.Attributes.Where(attr => attr.Name == "src").First().DeEntitizeValue.Split("/")[^1].Replace(".png", "");
        course.Grade = grade;
    }

    void ReadCourseInfo(Course course)
    {
        var courseInfoSection = _doc.DocumentNode.Descendants("ul").Where(node => node.HasClass("course_info"));
        var infoNodes = courseInfoSection.First().Descendants().Where(node => node.GetClasses().Any(cssClass => cssClass.Contains("course_info")));
        var nodesWithTitle = infoNodes.Where(element => element.ChildNodes.Where(child => child.Name == "b").Any());
        var keyValuePairs = nodesWithTitle.Select(node => new { Key = CleanUp(node.Descendants("b").First().InnerText, false), Value = CleanUp(node.Descendants("p").First().InnerText, true) });

        course.Address = keyValuePairs.First(kv => kv.Key == "Osoite").Value;
    }
    void ReadCourseName(Course course)
    {
        course.Name = CleanUp(_doc.DocumentNode.Descendants("h1").First().InnerText, true);
    }

    void ReadCourseHoles(Course course)
    {
        var holeDescriptionsDiv = _doc.GetElementbyId("rata-vaylakuvaukset").Descendants("div").Where(node => node.GetClasses().Any(cssClass => cssClass.Contains("tab-1"))).First();
        var holeDescriptions = holeDescriptionsDiv.Descendants("div").Where(node => node.HasClass("fairway"));

        List<Hole> holes = new List<Hole>();
        foreach (var node in holeDescriptions)
        {
            var nthHole = _numberAfterString.Match(node.Descendants("h4").First().InnerText).Groups[1].Value;
            var length = _holeLength.Match(node.Descendants("p").First().InnerHtml).Groups[1].Value;
            var par = _holePar.Match(node.Descendants("p").First().InnerHtml).Groups[1].Value;
            if (int.TryParse(nthHole, out int nthHoleInt) && int.TryParse(length, out int lengthInt) && int.TryParse(par, out int parInt))
            {
                holes.Add(new Hole() { NthHole = nthHoleInt, Length = lengthInt, Par = parInt });
            }
            
        };
        course.Holes = holes;
    }
    string CleanUp(string htmlInnerText, bool whiteSpace)
    {
        return _newLineTab.Replace(htmlInnerText, match =>
        {
            return whiteSpace ? " " : "";
        });
    }
    public CourseParser(string httpResponse)
    {
        _doc = new HtmlDocument();
        _doc.LoadHtml(httpResponse);
    }
}