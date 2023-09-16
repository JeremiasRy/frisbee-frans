using backend.Models;
using static backend.Models.Round;

namespace backend.DTOs;

public class RoundDTO : BaseDTO<Round>
{
    public int UserId { get; set; }
    public int CourseId { get; set; }
    public RoundStatus Status { get; set; } = RoundStatus.NotStarted;
    public override void UpdateModel(Round model)
    {
        model.UserId = UserId;
        model.CourseId = CourseId;
        model.Status = Status;
    }
}
