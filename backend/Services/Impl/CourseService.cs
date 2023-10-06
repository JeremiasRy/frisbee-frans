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
        if (request is CommonFilter filter)
        {
            var query = _appDbContext.Set<Course>().AsSplitQuery().Where(c => true);
            if (filter.City != "")
            {
                query = query.Where(course => course.City.NameNormalized.Contains(filter.City.ToUpper()));
            }
            if (filter.CourseName != "")
            {
                query = query.Where(course => course.NameNormalized.Contains(filter.CourseName.ToUpper()));
            }
            return await query
                .Skip(filter.PageSize * (filter.Page - 1))
                .Take(filter.PageSize)
                .ToListAsync();
        }
        return await base.GetAllAsync(request);
    }
}
