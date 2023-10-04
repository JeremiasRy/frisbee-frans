using HtmlParser;

RequestHandler requestHandler = new();
Parser parser = new (await requestHandler.GetHttpResponse("https://frisbeegolfradat.fi/rata/talin_frisbeegolfpuisto_helsinki/"));

parser.ReadCourseName();
parser.ReadCourseInfo();
