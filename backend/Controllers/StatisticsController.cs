using backend.Controllers.Abstraction;
using backend.DTOs.Statistics;
using backend.Services;
using Microsoft.AspNetCore.Mvc;

namespace backend.Controllers;

public class StatisticController : ApiControllerBase
{
    readonly IStatisticsService _service;
    public StatisticController(IStatisticsService service)
    {
        _service = service;
    }
    [HttpGet("course/{courseId:int}")]
    public async Task<CourseStatisticsDTO> GetCourseStatistics([FromRoute] int courseId)
    {
        return await _service.GetCourseStats(courseId);
    }
    [HttpGet("user/{userId:int}")]
    public async Task<UserStatisticsDTO> GetUserStatistics([FromRoute] int userId)
    {
        return await _service.GetUserStats(userId);
    }
    [HttpGet("hole/{holeId:int}")]
    public async Task<HoleStatisticsDTO> GetHoleStatistics([FromRoute] int holeId)
    {
        return await _service.GetHoleStats(holeId);
    }
}
