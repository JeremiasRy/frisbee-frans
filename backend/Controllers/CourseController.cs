using backend.Common.Filters;
using backend.Controllers.Abstraction;
using backend.DTOs;
using backend.Models;
using backend.Services.Abstraction;
using Backend.Src.Common;
using System.Runtime.CompilerServices;

namespace backend.Controllers;

public class CourseController : CrudController<Course, CourseDTO>
{
    public CourseController(ICrudService<Course, CourseDTO> service) : base(service)
    {
    }
    public async override Task<List<Course>> GetAll()
    {
        var filter = Request.QueryString.ParseParams<NameFilter>();
        if (filter is null)
        {
            return await base.GetAll();
        }
        return await _service.GetAllAsync(filter);
    }
}
