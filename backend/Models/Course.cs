using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json.Serialization;

namespace backend.Models;

public class Course : BaseModel
{
    [JsonIgnore]
    public City City { get; set; } = null!;
    public string CityName => City.Name;
    public string Address { get; set; } = null!;
    public Grade CourseGrade { get; set; } 
    public string Name { get; set; } = null!;
    [JsonIgnore]
    public string NameNormalized { get; set; } = null!;
    public List<Hole> Holes { get; set; } = null!;
    [NotMapped]
    public int CoursePar 
    { get
        {
            return Holes == null ? 0 : Holes.Sum(hole => hole.Par); 
        } 
    }
    public enum Grade
    {
        NoGrade = -1,
        d3 = 0,
        d2 = 1,
        d1 = 2,
        c3 = 3,
        c2 = 4,
        c1 = 5,
        b3 = 6,
        b2 = 7,
        b1 = 8,
        a3 = 9,
        a2 = 10,
        a1 = 11,
        aa3 = 12,
        aa2 = 13,
        aa1 = 14,
        aaa1 = 15,
    }
}
