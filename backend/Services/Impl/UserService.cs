using backend.DTOs;
using backend.Models;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;

namespace backend.Services.Impl;

public class UserService : IUserService
{
    private readonly UserManager<User> _userManager;
    private readonly IJwtService _jwtService;
    public UserService(UserManager<User> userManager, IJwtService jwtService)
    {
        _userManager = userManager;
        _jwtService = jwtService;
    }
    public async Task<bool> CreateUserAsync(RegisterDTO request)
    {
        var user = new User()
        {
            UserName = request.Name,
        };
        var result = await _userManager.CreateAsync(user, request.Password);

        return result.Succeeded;
    }
    public async Task<List<PublicUserInfoDTO>> GetUsersAsync(string name)
    {
        var result = await _userManager.Users.Where(user => user.NormalizedUserName.Contains(name.Normalize())).ToListAsync();

        return result.Select(user => PublicUserInfoDTO.FromUser(user)).ToList(); 
    }
    public async Task<LoginResponseDTO?> Login(RegisterDTO request)
    {
        var user = await _userManager.FindByNameAsync(request.Name);

        if (!await _userManager.CheckPasswordAsync(user, request.Password))
        {
            return null;
        }

        user.LoginCount += 1;
        await _userManager.UpdateAsync(user);

        return _jwtService.CreateToken(user);
    }
}
