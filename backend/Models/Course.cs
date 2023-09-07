using System.ComponentModel.DataAnnotations.Schema;

namespace backend.Models;

public class Course : BaseModel
{
    public string Name { get; set; } = null!;
    public List<Hole> Holes { get; set; } = null!;
    [NotMapped]
    public int CoursePar 
    { get
        {
            return Holes == null ? 0 : Holes.Sum(hole => hole.Par); 
        } 
    }
}
