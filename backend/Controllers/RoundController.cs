using backend.Controllers.Abstraction;
using backend.DTOs;
using backend.Models;
using backend.Services.Abstraction;

namespace backend.Controllers;

public class RoundController : CrudController<Round, RoundDTO>
{
    public RoundController(ICrudService<Round, RoundDTO> service) : base(service)
    {
        
    }
}
