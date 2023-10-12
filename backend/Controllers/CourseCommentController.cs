using backend.Controllers.Abstraction;
using backend.DTOs;
using backend.Models;
using backend.Services.Abstraction;

namespace backend.Controllers;

public class CourseCommentController : CrudController<CourseComment, CourseCommentDTO>
{
    public CourseCommentController(ICrudService<CourseComment, CourseCommentDTO> service) : base(service)
    {
    }
}
