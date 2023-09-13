namespace backend.Common.Filters;

public class IdFilter : BaseQuery
{
    public int CourseId { get; set; } = 0;
    public int UserId { get; set; } = 0;
    public int RoundId { get; set; } = 0;
}
