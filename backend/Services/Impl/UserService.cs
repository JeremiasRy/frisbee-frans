using backend.Models;
using Microsoft.AspNetCore.Identity;

namespace backend.Services.Impl;

public class UserService
{
    private readonly UserManager<User> _userManager;
    public UserService(UserManager<User> userManager)
    {
        _userManager = userManager;
    }
    public async Task<User> CreateUserAsync(string name)
    {
        var user = new User
        {
            UserName = name
        };
        await _userManager.CreateAsync(user);
        return user;
    }
    public async Task<User> GetUserAsync(string name)
    {
        return await _userManager.FindByNameAsync(name);
    }
}
