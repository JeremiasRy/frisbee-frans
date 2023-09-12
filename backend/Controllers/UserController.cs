using backend.Controllers.Abstraction;
using backend.DTOs;
using backend.Models;
using backend.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace backend.Controllers;

public class UserController : ApiControllerBase
{
    private readonly IUserService _service;
    public UserController(IUserService service)
    {
        _service = service;
    }
    [HttpPost("signup")]
    [AllowAnonymous]
    public async Task<PublicUserInfoDTO?> CreateOne([FromBody] RegisterDTO request)
    {
        return await _service.CreateUserAsync(request);
    }
    [HttpPost("login")]
    [AllowAnonymous]
    public async Task<PublicUserInfoDTO?> Login([FromBody] RegisterDTO request)
    {
        return await _service.CreateUserAsync(request);
    }
    [HttpGet]
    public async Task<List<PublicUserInfoDTO>> GetUsers([FromQuery] string name)
    {
        return await _service.GetUsersAsync(name);
    }
}
