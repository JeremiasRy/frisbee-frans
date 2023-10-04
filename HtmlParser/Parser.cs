using HtmlAgilityPack;
using System.Linq;
using System.Text.RegularExpressions;

namespace HtmlParser;

public class Parser
{
    readonly HtmlDocument _doc;
    readonly Regex _newLineTab = new(@"[\n\t]+");
    readonly Regex _numberAfterString = new(@"\w+\s(\d*)");
    readonly Regex _holeLength = new(@"Pituus\s(\d*)");
    readonly Regex _holePar = new(@"Par\s(\d*)");

    public void ReadCourseInfo()
    {
        var courseInfoSection = _doc.DocumentNode.Descendants("ul").Where(node => node.HasClass("course_info"));
        var infoNodes = courseInfoSection.First().Descendants().Where(node => node.GetClasses().Any(cssClass => cssClass.Contains("course_info")));
        var nodesWithTitle = infoNodes.Where(element => element.ChildNodes.Where(child => child.Name == "b").Any());
        var keyValuePairs = nodesWithTitle.Select(node => new { Key = CleanUp(node.Descendants("b").First().InnerText, false), Value = CleanUp(node.Descendants("p").First().InnerText, true) });

        foreach (var kv in keyValuePairs) 
        {
            Console.WriteLine("{0} = {1}", kv.Key, kv.Value);   
        }
    }
    public void ReadCourseName()
    {
        Console.WriteLine("{0}", CleanUp(_doc.DocumentNode.Descendants("h1").First().InnerText, true));
    }

    public void ReadCourseHoles()
    {
        var holeDescriptionsDiv = _doc.GetElementbyId("rata-vaylakuvaukset").Descendants("div").Where(node => node.GetClasses().Any(cssClass => cssClass.Contains("tab-1"))).First();
        var holeDescriptions = holeDescriptionsDiv
            .Descendants("span")
            .Select(node => new 
            { 
                NthHole = _numberAfterString.Match(node.Descendants("h4").First().InnerText).Groups[^1].Value, 
                Length = _holeLength.Match(node.Descendants("p").First().InnerHtml).Groups[^1].Value, 
                Par = _holePar.Match(node.Descendants("p").First().InnerHtml).Groups[^1].Value 
            });

        Console.WriteLine("");
    }
    public string CleanUp(string htmlInnerText, bool whiteSpace)
    {
        return _newLineTab.Replace(htmlInnerText, match =>
        {
            return whiteSpace ? " " : "";
        });
    }
    public Parser(string httpResponse)
    {
        _doc = new HtmlDocument();
        _doc.LoadHtml(httpResponse);
    }
}