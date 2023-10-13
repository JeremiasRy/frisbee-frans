using HtmlParser;
using InformationScraper;
using System.Text.Encodings.Web;
using System.Text.Json;
using System.Text.Unicode;
using static InformationScraper.FileParsingMethods;

Console.WriteLine("Fetching links...");
var linkBank = LinkBank.GetInstance("https://frisbeegolfradat.fi/radat/");
await linkBank.InitializeLinks();
List<Worker> workers = new ();

for (var i = 0; i < 5; i++)
{
    workers.Add(new Worker(linkBank, i));
}

var tasks = workers.AsParallel().Select(worker => worker.DoWork()).ToArray();
var results = await Task.WhenAll(tasks);
Console.WriteLine(results.Length);
