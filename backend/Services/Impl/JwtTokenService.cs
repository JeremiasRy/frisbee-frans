using backend.DTOs;
using backend.Models;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

namespace backend.Services.Impl;

public class JwtTokenService : IJwtService
{
    private readonly IConfiguration _configuration;
    public JwtTokenService(IConfiguration configuration)
    {
        _configuration = configuration;
    }

    public LoginResponseDTO CreateToken(User user)
    {
        List<Claim> claims = new()
        {
            new Claim(JwtRegisteredClaimNames.Iat, DateTime.Now.ToString()),
            new Claim(JwtRegisteredClaimNames.Sub, user.Id.ToString()),
            new Claim(JwtRegisteredClaimNames.Email, user.Email),
            new Claim(JwtRegisteredClaimNames.Name, user.UserName)
        };

        string secret = _configuration["Jwt:secret"];
        var signinkey = new SigningCredentials(new SymmetricSecurityKey(Encoding.UTF8.GetBytes(secret)), SecurityAlgorithms.HmacSha256);
        var expiration = DateTime.Now.AddHours(_configuration.GetValue<int>("Jwt:ExpiresInHours"));

        var token = new JwtSecurityToken(
            _configuration["Jwt:Issuer"],
            _configuration["Jwt:Audience"],
            claims,
            expires: expiration,
            signingCredentials: signinkey
            );

        var writer = new JwtSecurityTokenHandler();

        return new LoginResponseDTO() { Token = writer.WriteToken(token), Id = user.Id };
    }

    public JwtSecurityToken ReadToken(string token)
    {
        throw new NotImplementedException();
    }
}
