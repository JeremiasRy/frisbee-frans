using backend.Models;

namespace backend.DTOs;

public class HoleResultDTO : BaseDTO<HoleResult>
{
    public int UserId { get; set; }
    public int HoleId { get; set; }
    public int RoundId { get; set; }
    public int Throws { get; set; }
    public int Penalties { get; set; }
    public override void UpdateModel(HoleResult model)
    {
        model.HoleId = HoleId;
        model.UserId = UserId;
        model.RoundId = RoundId;
        model.Penalties = Penalties;
        model.Throws = Throws;
    }
}
