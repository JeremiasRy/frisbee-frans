using backend.Models;

namespace backend.DTOs;

public class RoundDTO : BaseDTO<Round>
{
    public int UserId { get; set; }
    public override void UpdateModel(Round model)
    {
        model.UserId = UserId;
    }
}
