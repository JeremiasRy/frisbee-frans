using System.ComponentModel.DataAnnotations.Schema;

namespace backend.Models;

public class Hole : BaseModel
{
    public int Par { get; set; }
    public int Length { get; set; }
    public int NthHole { get; set; }
    public Course Course { get; set; } = null!;
    public int CourseId { get; set; }
}
