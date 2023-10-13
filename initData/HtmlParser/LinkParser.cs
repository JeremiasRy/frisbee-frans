using HtmlAgilityPack;

namespace HtmlParser;

public class LinkParser
{
    readonly HtmlDocument _doc;
    public List<string> UrlsToParse()
    {
        var aElements = _doc.DocumentNode.Descendants("td").Where(node => node.GetClasses().Any(classStr => classStr.Contains("rataCol"))).Select(tdElement => tdElement.Descendants("a").First());
        return aElements.Select(node => node.Attributes.Where(x => x.Name == "href").First().DeEntitizeValue).ToList();
    }
    public List<string> CitiesFromIndex()
    {
        var trElements = _doc.DocumentNode.Descendants("td").Where(node => node.GetClasses().Any(cssClass => cssClass == "paikkaCol"));
        return trElements.Select(node => node.InnerText.Trim()).Distinct().ToList();
    }
    public LinkParser(string httpResponse)
    {
        _doc = new HtmlDocument();
        _doc.LoadHtml(httpResponse);
    }
}
