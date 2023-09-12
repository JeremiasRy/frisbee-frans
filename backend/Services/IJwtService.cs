using backend.DTOs;
using backend.Models;
using System.IdentityModel.Tokens.Jwt;

namespace backend.Services;

public interface IJwtService
{
    LoginResponseDTO CreateToken(User user);
    JwtSecurityToken ReadToken(string token);
}
