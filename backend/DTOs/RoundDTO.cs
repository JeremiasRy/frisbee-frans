using backend.Models;

namespace backend.DTOs;

public class RoundDTO : BaseDTO<Round>
{
    public int UserId { get; set; }
    public List<HoleResult> RoundResult { get; set; } = null!;
    public override void UpdateModel(Round model)
    {
        model.RoundResult = RoundResult;
        model.UserId = UserId;
    }
}
