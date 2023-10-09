using static backend.Models.Course;

namespace backend.Common.Filters;

public class CourseFilter : BaseQuery
{
    public string CourseName { get; set; } = null!;
    public string City { get; set; } = null!;
    public Grade? Grade { get; set; }
    public SortDirection? Sort { get; set; }
    public CourseSortProperty? SortProperty { get; set; }

    public enum SortDirection 
    { 
        ASCENDING, 
        DESCENDING 
    }
    public enum CourseSortProperty
    {
        City,
        Grade,
        Name,
        Rounds
    }
}
