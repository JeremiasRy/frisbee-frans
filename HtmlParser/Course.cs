using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace HtmlParser;

public class Course
{
    public string Name { get; set; }
    public string Address { get; set; }
    public string Grade { get; set; }
    public List<Hole> Holes { get; set; }
}
