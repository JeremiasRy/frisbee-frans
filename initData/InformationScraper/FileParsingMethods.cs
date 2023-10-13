using HtmlParser;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Text.Encodings.Web;
using System.Text.Json;
using System.Text.Unicode;
using System.Threading.Tasks;

namespace InformationScraper;

public static class FileParsingMethods
{
    public static void ParseCourseGradesFromJson()
    {
        string coursesParsed;
        using (var sr = new StreamReader("../../../../courses.json"))
        {
            var courses = JsonSerializer.Deserialize<List<Course>>(sr.ReadToEnd()) ?? throw new Exception("things exploded");
            List<CourseGradeParsed> coursesGradeParsed = courses.Select(course => CourseGradeParsed.FromCourse(course)).ToList();
            coursesParsed = JsonSerializer.Serialize(coursesGradeParsed);
        }
        using var sw = new StreamWriter("../../../../courses.json");
        sw.Write(coursesParsed);
    }
}
