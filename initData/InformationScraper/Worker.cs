using HtmlAgilityPack;
using HtmlParser;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace InformationScraper;

public class Worker
{
    private readonly HttpClient _httpClient;
    private readonly HtmlDocument _doc = new();
    private readonly LinkBank _bank;
    private readonly List<CourseGradeParsed> _results = new();
    private readonly int _id;
    async Task ReadToDoc()
    {
        var url = _bank.GetUrlFromQueue();
        Console.WriteLine("Fetching course from: {0}", url);
        if (url == null)
        {
            Console.WriteLine("No more links to parse");
            return;
        }
        string httpContent = await _httpClient.GetAsync(url).Result.Content.ReadAsStringAsync();
        _doc.LoadHtml(httpContent);
    }
    void ParseCourse()
    {
        var parser = new CourseParser(_doc);
        var course = parser.ReturnCourse();
        _results.Add(CourseGradeParsed.FromCourse(course));
    }
    public async Task<List<CourseGradeParsed>> DoWork()
    {
        while (!_bank.LinksDone)
        {
            Console.WriteLine("Worker {0}, started", _id);
            await ReadToDoc();
            ParseCourse();
        }
        return _results; 
    }
    public Worker(LinkBank bank, int id)
    {
        _httpClient = new HttpClient();
        _bank = bank;
        _id = id;
    }
}
