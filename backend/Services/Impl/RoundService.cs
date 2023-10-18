using backend.Common.Filters;
using backend.Db;
using backend.DTOs;
using backend.Models;
using backend.Services.Abstraction;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;

namespace backend.Services.Impl;

public class RoundService : CrudService<Round, RoundDTO>
{
    readonly UserManager<User> _userManager;
    public RoundService(AppDbContext appDbContext, UserManager<User> userManager) : base(appDbContext)
    {
        _userManager = userManager;
    }
    public async override Task<List<Round>> GetAllAsync(IFilterOptions request)
    {
        if (request is CommonFilter filter)
        {
            var query = _appDbContext
                .Set<Round>()
                .OrderBy(round => round.Id)
                .OrderByDescending(round => round.CreatedAt)
                .AsSplitQuery()
                .AsNoTracking().Where(c => true);

            if (filter.CourseId != 0)
            {
                query = query.Where(round => round.CourseId == filter.CourseId);
            }
            if (filter.UserId != 0)
            {
                query = query.Where(round => round.UserId == filter.UserId);
            }
            if (filter.UserId == 0 && filter.Username.Length > 0)
            {
                List<int> userIds = await _userManager.Users.Where(user => user.NormalizedUserName.Contains(filter.Username.ToUpperInvariant())).Select(user => user.Id).ToListAsync();
                query = query.Where(round => userIds.Contains(round.UserId));
            }
            if (filter.CourseId == 0 && filter.CourseName.Length > 0) 
            {
                List<int> courseIds = await _appDbContext.Set<Course>().Where(course => course.NameNormalized.Contains(filter.CourseName.ToUpperInvariant())).Select(course => course.Id).ToListAsync();
                query = query.Where(round => courseIds.Contains(round.CourseId));
            }

            return await query
                .Skip(filter.PageSize * (filter.Page - 1))
                .Take(filter.PageSize)
                .ToListAsync();
        }
        return await base.GetAllAsync(request);
    }
}
