using backend.DTOs.Statistics;

namespace backend.Services
{
    public interface IStatisticsService
    {
        Task<CourseStatisticsDTO?> GetCourseStats(int courseId);
        Task<HoleStatisticsDTO?> GetHoleStats(int holeId);
        Task<UserStatisticsDTO?> GetUserStats(int userId);
    }
}