using backend.Controllers.Abstraction;
using backend.DTOs;
using backend.Models;
using backend.Services;

namespace backend.Controllers;

public class CourseController : CrudController<Course, CourseDTO>
{
    public CourseController(ICourseService service) : base(service)
    {
    }
}
