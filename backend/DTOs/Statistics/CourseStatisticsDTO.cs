using backend.Models;

namespace backend.DTOs.Statistics;

public class CourseStatisticsDTO
{
    public double AverageScore { get; set; }
    public int BestScore { get; set; }
    public int RoundsPlayed { get; set; }

    public static CourseStatisticsDTO FromRoundQuery(List<Round> query)
    {
        return new CourseStatisticsDTO
        {
            AverageScore = query.Average(round => round.RoundResult),
            BestScore = query.Min(round => round.RoundResult),
            RoundsPlayed = query.Count,
        };
    }
}
