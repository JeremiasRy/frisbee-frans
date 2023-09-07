using backend.Models;

namespace backend.Services
{
    public interface IUserService
    {
        Task<User> CreateUserAsync(string name);
        Task<User> GetUserAsync(string name);
    }
}