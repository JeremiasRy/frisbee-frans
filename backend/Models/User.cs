using Microsoft.AspNetCore.Identity;

namespace backend.Models;

public class User : IdentityUser<int>
{
    public List<Round> Rounds { get; set; } = null!;
    public int LoginCount { get; set; }
}
