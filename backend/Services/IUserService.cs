using backend.DTOs;

namespace backend.Services;

public interface IUserService
{
    Task<PublicUserInfoDTO?> CreateUserAsync(RegisterDTO request);
    Task<List<PublicUserInfoDTO>> GetUsersAsync(string name);
    Task<LoginResponseDTO?> Login(RegisterDTO request);
}