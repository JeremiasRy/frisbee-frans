using backend.Controllers.Abstraction;
using backend.DTOs;
using backend.Models;
using backend.Services.Abstraction;

namespace backend.Controllers;

public class CourseController : CrudController<Course, CourseDTO>
{
    public CourseController(ICrudService<Course, CourseDTO> service) : base(service)
    {
    }
}
