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
        if (request is CourseFilter filter)
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
            if (filter.Grade is not null)
            {
                query = query.Where(course => course.CourseGrade == filter.Grade);
            }
            if (filter.SortProperty == CourseFilter.CourseSortProperty.Grade && filter.Sort is not null)
            {
                query = filter.Sort == CourseFilter.SortDirection.ASCENDING 
                    ? query.OrderBy(course => (int)course.CourseGrade) 
                    : query.OrderByDescending(course => (int)course.CourseGrade);
            }
            return await query
                .Skip(filter.PageSize * (filter.Page - 1))
                .Take(filter.PageSize)
                .ToListAsync();
        }
        return await base.GetAllAsync(request);
    }
}
