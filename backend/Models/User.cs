﻿using Microsoft.AspNetCore.Identity;
using System.Text.Json.Serialization;

namespace backend.Models;

public class User : IdentityUser<int>
{
    [JsonIgnore]
    public List<Round> Rounds { get; set; } = null!;
    public int LoginCount { get; set; }
}
