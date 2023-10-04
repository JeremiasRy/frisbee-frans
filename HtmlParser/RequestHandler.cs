using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Net.Http;

namespace HtmlParser;

public class RequestHandler
{
    readonly HttpClient _client = new();

    /// <summary>
    /// Returns HTTP response as a string, string is empty if fetching failed.
    /// </summary>
    /// <param name="url"></param>
    /// <returns>string</returns>
    public async Task<string> GetHttpResponse(string url)
    {
        var response = await _client.GetAsync(url);
        if (response.IsSuccessStatusCode)
        {
            return await response.Content.ReadAsStringAsync();
        } else
        {
            Console.WriteLine("Fetch from {} failed", url);
            return "";
        }
    }

}
