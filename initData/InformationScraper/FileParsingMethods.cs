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
    public static async Task FetchCourseDataAndParseIt(int clientCount)
    {
        List<RequestHandler> handlers = new();
        for (int i = 0; i < clientCount; i++)
        {
            handlers.Add(new RequestHandler());
        }
        LinkParser linkParser = new(await handlers.First().GetHttpResponse("https://frisbeegolfradat.fi/radat/"));

        var urls = linkParser.UrlsToParse();
        var cities = linkParser.CitiesFromIndex();

        JsonSerializerOptions options = new()
        {
            Encoder = JavaScriptEncoder.Create(UnicodeRanges.All)
        };

        using (var sw = new StreamWriter("../../../../cities.json"))
        {
            var citiesJson = JsonSerializer.Serialize(cities, options);
            sw.Write(citiesJson);
        }
        var courses = new List<CourseGradeParsed>();
        int count = 0;

        var watch = new System.Diagnostics.Stopwatch();

        while (count < urls.Count)
        {
            watch.Start();
            Task<string>[] tasks = new Task<string>[urls.Count - count < clientCount ? urls.Count - count : clientCount];
            for (int i = 0; i < tasks.Length; i++)
            {
                tasks[i] = handlers[i].GetHttpResponse(urls[count++]);
            }
            Task.WaitAll(tasks);
            var coursesParsed = tasks.Select(t => CourseGradeParsed.FromCourse(new CourseParser(t.Result).ReturnCourse()));
            courses.AddRange(coursesParsed);
            PrintResult(coursesParsed, urls.Count, watch.ElapsedMilliseconds);
            watch.Restart();
            Console.WriteLine("{0} out of {1} parsed", count + 1, urls.Count);
        }

        using var fw = new StreamWriter("../../../../courses.json");
        var json = JsonSerializer.Serialize(courses, options);
        fw.Write(json);
    }
    static void PrintResult(IEnumerable<CourseGradeParsed> result, int urlCount, long totalElapsed)
    {
        Console.WriteLine("{0} Courses parsed:", result.Count());
        foreach (var course in result)
        {
            Console.WriteLine("{0}", course.Name);
        }
        Console.WriteLine("Total time elapsed {0}ms", totalElapsed);
    }
}
