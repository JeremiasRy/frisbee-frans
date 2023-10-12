using backend.Models;

namespace backend.DTOs;

public abstract class CommentDTO<TModel> : BaseDTO<TModel> where TModel : BaseModel
{
    public int UserId { get; set; }
    public string Text { get; set; } = null!;
}
