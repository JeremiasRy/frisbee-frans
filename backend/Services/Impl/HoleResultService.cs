using backend.Common.Filters;
using backend.Db;
using backend.DTOs;
using backend.Models;
using backend.Services.Abstraction;
using Microsoft.EntityFrameworkCore;

namespace backend.Services.Impl;

public class HoleResultService : CrudService<HoleResult, HoleResultDTO>
{
    public HoleResultService(AppDbContext appDbContext) : base(appDbContext)
    {
    }
    public override async Task<List<HoleResult>> GetAllAsync(IFilterOptions request)
    {
        if (request is IdFilter filter)
        {
            var query = _appDbContext.Set<HoleResult>().Where(c => true);
            if (filter.UserId > 0)
            {
                query = query.Where(holeResult => holeResult.UserId == filter.UserId);
            }
            if (filter.RoundId > 0) 
            {
                query = query.Where(holeResult => holeResult.RoundId == filter.RoundId);
            }
            if (filter.HoleId > 0)
            {
                query = query.Where(holeResult => holeResult.HoleId == filter.HoleId);
            }
            return await query.ToListAsync();
        }
        return await base.GetAllAsync(request);
    }
}
