using backend.Common.Filters;
using backend.Db;
using backend.DTOs;
using backend.Models;
using backend.Services.Abstraction;
using Microsoft.EntityFrameworkCore;

namespace backend.Services.Impl;

public class RoundService : CrudService<Round, RoundDTO>
{
    public RoundService(AppDbContext appDbContext) : base(appDbContext)
    {
    }
    public async override Task<List<Round>> GetAllAsync(IFilterOptions request)
    {
        if (request is RoundFilter filter)
        {
            var query = _appDbContext.Set<Round>().Where(c => true);

            if (filter.CourseId != 0)
            {
                query = query.Where(round => round.CourseId == filter.CourseId);
            }
            if (filter.UserId != 0)
            {
                query = query.Where(round => round.UserId == filter.UserId);
            }
            query = query.OrderBy(round => round.CreatedAt);
            return await query
                .Skip(filter.PageSize * (filter.Page - 1))
                .Take(filter.PageSize)
                .ToListAsync();
        }
        return await base.GetAllAsync(request);
    }
}
