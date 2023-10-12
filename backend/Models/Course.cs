using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json.Serialization;

namespace backend.Models;

public class Course : BaseModel
{
    [JsonIgnore]
    public City City { get; set; } = null!;
    public string CityName => City.Name;
    public string Address { get; set; } = null!;
    public List<HoleComment>? Comments { get; set; }
    public Grade CourseGrade { get; set; } 
    public int RoundsPlayed { get; set; }
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
        NONE = -2,
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
        bb1 = 9,
        bb2 = 10,
        bb3 = 11,
        a3 = 12,
        a2 = 13,
        a1 = 14,
        aa3 = 15,
        aa2 = 16,
        aa1 = 17,
        aaa1 = 18,
    }
}
