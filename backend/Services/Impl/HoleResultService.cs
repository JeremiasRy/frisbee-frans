using backend.Common.Filters;
using backend.Db;
using backend.DTOs;
using backend.Models;
using backend.Services.Abstraction;
using Microsoft.EntityFrameworkCore;

namespace backend.Services.Impl;

public class HoleResultService : CrudService<HoleResult, HoleResultDTO>, IHoleResultService
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
    public async Task<List<HoleResult>> CreateMany(HoleResultDTO[] emptyRound)
    {
        var holeResults = emptyRound.Select(holeResultDTO =>
        {
            var newResult = new HoleResult();
            holeResultDTO.UpdateModel(newResult);
            return newResult;
        });
        _appDbContext.Set<HoleResult>().AddRange(holeResults);
        await _appDbContext.SaveChangesAsync();
        return await GetAllAsync(new IdFilter() { RoundId = holeResults.First().RoundId });
    }
    public async Task<List<HoleResult>> UpdateMany(HoleResultWithIdDTO[] request)
    {
        foreach (var holeResultDTO in request)
        {
            var holeResult = await GetByIdAsync(holeResultDTO.Id);
            holeResultDTO.UpdateModel(holeResult);
            _appDbContext.Update(holeResult);
        }
        await _appDbContext.SaveChangesAsync();
        return await GetAllAsync(new IdFilter() { RoundId =  request.First().RoundId });
    }
}
