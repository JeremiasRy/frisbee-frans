using System.Text.Json.Serialization;

namespace backend.Models;

public abstract class Comment : BaseModel
{
    public string Text { get; set; } = null!;
    [JsonIgnore]
    public User User { get; set; } = null!;
    public string UserName => User.UserName;
    public int UserId { get; set; }
}
