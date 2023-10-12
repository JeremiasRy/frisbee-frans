using backend.Models;

namespace backend.DTOs;

public class HoleCommentDTO : CommentDTO<HoleComment>
{
    public int HoleId { get; set; }
    public override void UpdateModel(HoleComment model)
    {
        model.HoleId = HoleId;
        model.UserId = UserId;
        model.Text = Text;
    }
}
