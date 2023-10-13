using backend.Models;

namespace backend.DTOs;

public class RoundCommentDTO : CommentDTO<RoundComment>
{
    public int RoundId { get; set; }

    public override void UpdateModel(RoundComment model)
    {
        model.Text = Text;
        model.UserId = UserId;
        model.RoundId = RoundId;
        model.RelationId = RoundId;
    }
}
