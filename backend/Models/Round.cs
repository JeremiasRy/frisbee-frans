using System.ComponentModel.DataAnnotations.Schema;

namespace backend.Models;

public class Round : BaseModel
{
    public User User { get; set; } = null!;
    public int UserId { get; set; }
    public Course Course { get; set; } = null!;
    public int CourseId { get; set; }
    public List<HoleResult> RoundResult { get; set; } = null!;
    [NotMapped]
    public int RoundTotal => RoundResult == null ? 0 : RoundResult.Sum(result => result.Penalties + result.Throws);
}
