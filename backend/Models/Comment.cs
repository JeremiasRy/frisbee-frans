using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json.Serialization;

namespace backend.Models;

public abstract class Comment : BaseModel
{
    public string Text { get; set; } = null!;
    [JsonIgnore]
    public User User { get; set; } = null!;
    [NotMapped]
    public string Username => User.UserName;
    public int UserId { get; set; }
    public int RelationId { get; set; }
}
