using backend.Controllers.Abstraction;
using backend.DTOs;
using backend.Models;
using backend.Services.Abstraction;

namespace backend.Controllers;

public class RoundCommentController : CrudCommentController<RoundComment, RoundCommentDTO>
{
    public RoundCommentController(ICrudService<RoundComment, RoundCommentDTO> service) : base(service)
    {
    }
}
