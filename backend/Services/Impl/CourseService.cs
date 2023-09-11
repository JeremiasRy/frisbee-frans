using backend.Common.Filters;
using backend.Db;
using backend.DTOs;
using backend.Models;
using backend.Services.Abstraction;

namespace backend.Services.Impl;

public class CourseService : CrudService<Course, CourseDTO>
{
    public CourseService(AppDbContext appDbContext) : base(appDbContext)
    {

    }
}
