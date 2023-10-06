using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json.Serialization;

namespace backend.Models;

public class Course : BaseModel
{
    [JsonIgnore]
    public City City { get; set; } = null!;
    public string CityName => City.Name;
    public string Address { get; set; } = null!;
    [JsonIgnore]
    public Grade Grade { get; set; } = null!;
    public string GradeValue => Grade.Value;
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
}
