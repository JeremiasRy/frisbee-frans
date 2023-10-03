using backend.Models;

namespace backend.DTOs;

public class LoginResponseDTO
{
    public int Id { get; set; }
    public string Token { get; set; } = null!;
    public int LoginCount { get; set; }

    public static LoginResponseDTO FromUser(string token, User user)
    {
        return new LoginResponseDTO()
        {
            Id = user.Id,
            Token = token,
            LoginCount = user.LoginCount,
        };
    }
}
