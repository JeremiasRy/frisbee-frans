using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json.Serialization;

namespace backend.Models;

public class Round : BaseModel
{
    [JsonIgnore]
    public User User { get; set; } = null!;
    public int UserId { get; set; }
    public Course Course { get; set; } = null!;
    public int CourseId { get; set; }
    public List<HoleResult> RoundResults { get; set; } = null!;
    [NotMapped]
    public string By => User.UserName;
    [NotMapped]
    public int RoundTotal => RoundResults == null ? 0 : RoundResults.Sum(result => result.Penalties + result.Throws);
    [NotMapped]
    public int RoundResult => RoundTotal != 0 ? RoundTotal - Course.CoursePar  : RoundTotal;
}
