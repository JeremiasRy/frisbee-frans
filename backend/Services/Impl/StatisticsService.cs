using backend.Db;
using backend.DTOs.Statistics;
using backend.Models;
using Microsoft.EntityFrameworkCore;

namespace backend.Services.Impl;

public class StatisticsService : IStatisticsService
{
    readonly AppDbContext _appDbContext;
    public StatisticsService(AppDbContext appDbContext)
    {
        _appDbContext = appDbContext;
    }

    public async Task<CourseStatisticsDTO?> GetCourseStats(int courseId)
    {
        List<Round> query = await _appDbContext
            .Set<Round>()
            .AsSplitQuery()
            .Where(round => round.CourseId == courseId && round.Status == Round.RoundStatus.Completed)
            .ToListAsync();

        if (!query.Any())
        {
            return null;
        }

        return CourseStatisticsDTO.FromRoundQuery(query);
    }
    public async Task<HoleStatisticsDTO?> GetHoleStats(int holeId)
    {
        List<HoleResult> query = await _appDbContext
            .Set<HoleResult>()
            .AsSplitQuery()
            .Where(result => result.HoleId == holeId)
            .ToListAsync();
        
        if (!query.Any())
        {
            return null;
        }

        return HoleStatisticsDTO.FromHoleResultQuery(query);
    }
    public async Task<UserStatisticsDTO?> GetUserStats(int userId)
    {
        List<HoleResult> query = await _appDbContext
            .Set<HoleResult>()
            .AsSplitQuery()
            .Where(result => result.UserId == userId)
            .ToListAsync();

        if (!query.Any())
        {
            return null;
        }

        return UserStatisticsDTO.FromHoleResultQuery(query);
    }
}
