using System.ComponentModel.DataAnnotations.Schema;

namespace backend.Models;

public class Hole : BaseModel
{
    public int Par { get; set; }
    public Course Course { get; set; } = null!;
    public int CourseId { get; set; }
    public int? NextHoleId { get; set; }
    public int? PreviousHoleId { get; set; }

    [NotMapped]
    public bool IsFirst => PreviousHoleId == null;
    [NotMapped]
    public bool IsLast => NextHoleId == null;
}
