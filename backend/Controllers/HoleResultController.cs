using backend.Controllers.Abstraction;
using backend.DTOs;
using backend.Models;
using backend.Services.Abstraction;

namespace backend.Controllers;

public class HoleResultController : CrudController<HoleResult, HoleResultDTO>
{
    public HoleResultController(ICrudService<HoleResult, HoleResultDTO> service) : base(service)
    {
        
    }
}
