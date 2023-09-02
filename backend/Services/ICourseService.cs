using backend.DTOs;
using backend.Models;
using backend.Services.Abstraction;

namespace backend.Services;

public interface ICourseService : ICrudService<Course, CourseDTO>
{
    Task<Course> AddHoleToCourseAsync(AddHoleToCourseDTO request);
}
