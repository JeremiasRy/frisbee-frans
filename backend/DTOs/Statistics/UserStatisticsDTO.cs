using backend.Models;

namespace backend.DTOs.Statistics;

public class UserStatisticsDTO
{
    public int TotalHolesPlayed { get; set; }
    public double AverageScore { get; set; }
    public int TotalThrows { get; set; }
    public List<(HoleResult.ResultIdentifier? result, int count)> BreakdownOfHoleResults { get; set; } = null!;
    public static UserStatisticsDTO FromHoleResultQuery(List<HoleResult> query)
    {
        return new UserStatisticsDTO
        {
            TotalHolesPlayed = query.Count,
            AverageScore = query.Average(result => (int)result.ScoreTag! == -99 ? 1 - result.Par : (int)result.ScoreTag),
            TotalThrows = query.Sum(result => result.Throws),
            BreakdownOfHoleResults = query.GroupBy(holeResult => holeResult.ScoreTag).Select(group => (group.Key, group.Count())).ToList()
        };
    }
}
