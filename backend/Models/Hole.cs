using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json.Serialization;

namespace backend.Models;

public class Hole : BaseModel
{
    public int Par { get; set; }
    public int Length { get; set; }
    public int NthHole { get; set; }
    [JsonIgnore]
    public Course Course { get; set; } = null!;
    public int CourseId { get; set; }
}
