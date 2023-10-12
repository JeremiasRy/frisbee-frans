using System.Text.Json.Serialization;

namespace backend.Models;

public abstract class Comment : BaseModel
{
    public string Text { get; set; } = null!;
    public User User { get; set; } = null!;
    public int UserId { get; set; }
}
