using HtmlParser;
using System.Text.Encodings.Web;
using System.Text.Json;
using System.Text.Unicode;

int clientCount = 5;
List<RequestHandler> handlers = new();
for (int i = 0; i < clientCount; i++)
{
    handlers.Add(new RequestHandler());
}
LinkParser linkParser = new (await handlers.First().GetHttpResponse("https://frisbeegolfradat.fi/radat/"));

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
var courses = new List<Course>();
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
    var coursesParsed = tasks.Select(t => new CourseParser(t.Result).ReturnCourse());
    courses.AddRange(coursesParsed);
    PrintResult(coursesParsed, urls.Count, watch.ElapsedMilliseconds);
    watch.Restart();
    Console.WriteLine("{0} out of {1} parsed", count + 1, urls.Count);
}
// Code used to extract grades from courses.json
/*
using (var sw = new StreamWriter("../../../../grades.json")) 
using(var sr = new StreamReader("../../../../courses.json"))
{
    var courses = JsonSerializer.Deserialize<List<Course>>(sr.ReadToEnd()) ?? throw new Exception("things exploded");
    var grades = courses.Select(course => course.Grade).Distinct().ToList();
    var gradesJson = JsonSerializer.Serialize(grades);
    sw.Write(gradesJson);
}
*/
using (var fw = new StreamWriter("../../../../courses.json"))
{
    var json = JsonSerializer.Serialize(courses, options);
    fw.Write(json);
}

static void PrintResult(IEnumerable<Course> result, int urlCount, long totalElapsed)
{
    Console.WriteLine("{0} Courses parsed:", result.Count());
    foreach (var course in result)
    {
        Console.WriteLine("{0}", course.Name);
    }
    Console.WriteLine("Total time elapsed {0}ms", totalElapsed);
}

