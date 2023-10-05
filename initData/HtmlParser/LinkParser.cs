﻿using HtmlAgilityPack;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace HtmlParser;

public class LinkParser
{
    readonly HtmlDocument _doc;
    public List<string> UrlsToParse()
    {
        var aElements = _doc.DocumentNode.Descendants("td").Where(node => node.GetClasses().Any(classStr => classStr.Contains("rataCol"))).Select(tdElement => tdElement.Descendants("a").First());
        return aElements.Select(node => node.Attributes.Where(x => x.Name == "href").First().DeEntitizeValue).ToList();
    }
    public LinkParser(string httpResponse)
    {
        _doc = new HtmlDocument();
        _doc.LoadHtml(httpResponse);
    }
}