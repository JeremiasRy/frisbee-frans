using System.ComponentModel.DataAnnotations.Schema;

namespace backend.Models;

public class HoleResult
{
    public User User { get; set; } = null!;
    public Hole Hole { get; set; } = null!;
    public int UserId { get; set; }
    public int HoleId { get; set; }
    public int Throws { get; set; }
    public int Penalties { get; set; }

    public ResultIdentifier ScoreTag()
    {
        if (Throws + Penalties == 1)
        {
            return ResultIdentifier.HoleInOne;
        }
        return (ResultIdentifier)(Throws + Penalties) - Hole.Par;
    }

    public enum ResultIdentifier
    {
        OctupleBogey = 8,
        SeptupleBogey = 7,
        SextupleBogey = 6,
        QuintupleBogey = 5,
        QuadrupleBogey = 4,
        TripleBogey = 3,
        DoubleBogey = 2,
        Bogey = 1,
        Par = 0,
        Birdie = -1,
        Eagle = -2,
        Albatross = -3,
        HoleInOne = -99,
    }
}
