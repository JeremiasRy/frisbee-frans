using backend.Controllers.Abstraction;
using backend.Models;
using backend.Services;
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
    public async Task<User> CreateOne([FromBody] string name)
    {
        return await _service.CreateUserAsync(name);
    }
    [HttpGet]
    public async Task<User> Get([FromQuery] string name)
    {
        return await _service.GetUserAsync(name);
    }
}
