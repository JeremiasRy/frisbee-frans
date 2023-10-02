using backend.Models;

namespace backend.DTOs.Statistics;

public class HoleStatisticsDTO
{
    public double AverageScore { get; set; }
    public List<GroupedIdentifierCount> BreakdownOfHoleResults { get; set; } = null!;

    public static HoleStatisticsDTO FromHoleResultQuery(List<HoleResult> query)
    {
        return new HoleStatisticsDTO
        {
            AverageScore = query.Average(result => (int)result.ScoreTag! == -99 ? 1 - result.Par : (int)result.ScoreTag),
            BreakdownOfHoleResults = query.GroupBy(holeResult => holeResult.ScoreTag).Select(group => GroupedIdentifierCount.FromGroup(group)).ToList()
        };
    }
}
