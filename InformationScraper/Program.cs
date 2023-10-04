using HtmlParser;
using System;
using static System.Net.WebRequestMethods;

RequestHandler requestHandler = new();
LinkParser linkParser = new (await requestHandler.GetHttpResponse("https://frisbeegolfradat.fi/radat/"));

var urls = linkParser.UrlsToParse();
var courses = new List<Course>();
int count = 0;

var watch = new System.Diagnostics.Stopwatch();

foreach (var url in urls)
{
    watch.Start();
    var data = await requestHandler.GetHttpResponse(url);
    var httpMs = watch.ElapsedMilliseconds;
    var parser = new CourseParser(data);
    courses.Add(parser.ReturnCourse());
    Console.WriteLine("Added course {0}, {1} out of {2} imported, total time taken {3}ms, of which HTTP request was {4}ms", courses[^1].Name, urls.Count, ++count, watch.ElapsedMilliseconds, httpMs);
    watch.Restart();
}

var json = System.Text.Json.JsonSerializer.Serialize(courses);
using (var fw = new StreamWriter("../../../../backend/initData/courses.json"))
{
    fw.Write(json);
}
