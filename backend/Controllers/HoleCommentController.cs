using backend.Controllers.Abstraction;
using backend.DTOs;
using backend.Models;
using backend.Services.Abstraction;

namespace backend.Controllers;

public class HoleCommentController : CrudController<HoleComment, HoleCommentDTO>
{
    public HoleCommentController(ICrudService<HoleComment, HoleCommentDTO> service) : base(service)
    {
    }
}
