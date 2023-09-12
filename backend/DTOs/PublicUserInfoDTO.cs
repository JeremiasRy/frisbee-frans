using backend.Models;

namespace backend.DTOs;

public class PublicUserInfoDTO
{
    public int Id { get; set; }
    public string Name { get; set; } = null!;
    public static PublicUserInfoDTO FromUser(User user)
    {
        return new PublicUserInfoDTO()
        {
            Id = user.Id,
            Name = user.UserName
        };
    }
}
