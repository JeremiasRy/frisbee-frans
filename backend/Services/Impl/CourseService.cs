using backend.Common.Filters;
using backend.Db;
using backend.DTOs;
using backend.Models;
using backend.Services.Abstraction;
using Microsoft.EntityFrameworkCore;

namespace backend.Services.Impl;

public class CourseService : CrudService<Course, CourseDTO>
{
    public CourseService(AppDbContext appDbContext) : base(appDbContext)
    {

    }
    public async override Task<List<Course>> GetAllAsync(IFilterOptions request)
    {
        if (request is NameFilter filter)
        {
            return await _appDbContext
                .Set<Course>()
                .Where(course => course.NameNormalized.Contains(filter.Name.ToUpperInvariant()))
                .Skip(filter.PageSize * (filter.Page - 1))
                .Take(filter.PageSize)
                .ToListAsync();
        }
        return await base.GetAllAsync(request);
    }
}
