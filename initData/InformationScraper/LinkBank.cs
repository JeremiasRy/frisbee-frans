using HtmlParser;
using System;
using System.Collections.Generic;
using System.Linq;
namespace InformationScraper;

public class LinkBank
{
    private static LinkBank? _instance;
    private static readonly object _lock = new();
    private readonly string _linkUrl;
    readonly Queue<string> _urlsToParse = new();
    public bool LinksDone => !_urlsToParse.Any();    
    public static LinkBank GetInstance(string url)
    {
        if (_instance == null)
        {
            lock (_lock)
            {
                _instance ??= new LinkBank(url);
            }
        }
        return _instance;
       
    }
    private LinkBank(string url) 
    {
        _linkUrl = url;
    }
    public string? GetUrlFromQueue()
    {
        Console.WriteLine("Url requested from bank");
        if (_urlsToParse.Count > 0)
        {
            Console.WriteLine("{0} urls left to parse", _urlsToParse.Count);
            return _urlsToParse.Dequeue();
        }
        return null;
        
    }
    public async Task InitializeLinks()
    {
        var linkParser = new LinkParser(await RequestHandler.GetHttpResponse(_linkUrl));
        foreach(var link in linkParser.UrlsToParse())
        {
            _urlsToParse.Enqueue(link);
        }
    }
}
