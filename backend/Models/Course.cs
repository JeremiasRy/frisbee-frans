using System.ComponentModel.DataAnnotations.Schema;

namespace backend.Models;

public class Course : BaseModel
{
    public string Name { get; set; } = null!;
    public List<Hole> Holes { get; set; } = null!;
    [NotMapped]
    public int CoursePar => Holes.Sum(h => h.Par);
}
