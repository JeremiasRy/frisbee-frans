namespace backend.Models;

public class Round : BaseModel
{
    public User User { get; set; } = null!;
    public int UserId { get; set; }
    public List<HoleResult> RoundResult { get; set; } = null!;
}
