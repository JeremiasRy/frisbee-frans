using static backend.Models.Course;

namespace backend.Common.Filters;

public class CommonFilter : BaseQuery
{
    public int CourseId { get; set; } = 0;
    public int UserId { get; set; } = 0;
    public int RoundId { get; set; } = 0;
    public int HoleId { get; set; } = 0;
    public string Username { get; set; } = null!;
    public string CourseName { get; set; } = null!;
}
