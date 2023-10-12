using backend.Models;

namespace backend.DTOs;

public class CourseCommentDTO : CommentDTO<CourseComment>
{
    public int CourseId { get; set; }
    public override void UpdateModel(CourseComment model)
    {
        model.Text = Text;
        model.CourseId = CourseId;
        model.UserId = UserId;
    }
}
