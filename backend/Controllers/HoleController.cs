using backend.Controllers.Abstraction;
using backend.DTOs;
using backend.Models;
using backend.Services.Abstraction;

namespace backend.Controllers;

public class HoleController : CrudController<Hole, HoleDTO>
{
    public HoleController(ICrudService<Hole, HoleDTO> service) : base(service)
    {
    }
}
