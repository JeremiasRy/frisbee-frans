using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json.Serialization;

namespace backend.Models;

public class Hole : BaseModel
{
    public int Par { get; set; }
    public int Length { get; set; }
    public List<HoleComment>? Comments { get; set; }
    public int NthHole { get; set; }
    [NotMapped]
    public string CourseName => Course.Name;
    [JsonIgnore]
    public Course Course { get; set; } = null!;
    public int CourseId { get; set; }
}
