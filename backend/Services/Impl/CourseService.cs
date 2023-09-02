using backend.Db;
using backend.DTOs;
using backend.Models;
using backend.Services.Abstraction;

namespace backend.Services.Impl;

public class CourseService : CrudService<Course, CourseDTO>, ICourseService
{
    public CourseService(AppDbContext appDbContext) : base(appDbContext)
    {
    }

    public async Task<Course> AddHoleToCourseAsync(AddHoleToCourseDTO request)
    {
        var course = await GetByIdAsync(request.CourseId);
        request.UpdateModel(course);
        await _appDbContext.SaveChangesAsync();
        return course;
    }
}
