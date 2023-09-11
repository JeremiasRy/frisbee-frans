using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json.Serialization;

namespace backend.Models;

public class HoleResult : BaseModel
{
    [JsonIgnore]
    public User User { get; set; } = null!;
    [JsonIgnore]
    public Hole Hole { get; set; } = null!;
    [JsonIgnore]
    public Round Round { get; set; } = null!;
    public int UserId { get; set; }
    public int HoleId { get; set; }
    public int RoundId { get; set; }
    [NotMapped]
    public int NthHole => Hole.NthHole;
    [JsonIgnore]
    public int Throws { get; set; }
    [JsonIgnore]
    public int Penalties { get; set; }

    [NotMapped]
    public ResultIdentifier? ScoreTag 
    { get
        { 
            if (Hole == null)
            {
                return null;
            }
            return Throws + Penalties == 1
                ? ResultIdentifier.HoleInOne
                : (ResultIdentifier)(Throws + Penalties - Hole.Par);
        } 
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
