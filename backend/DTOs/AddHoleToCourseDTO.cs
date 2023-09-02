using backend.Models;

namespace backend.DTOs;

public class AddHoleToCourseDTO : BaseDTO<Course>
{
    public int CourseId { get; set; }
    public Hole Hole { get; set; } = null!;

    public override void UpdateModel(Course model)
    {
        model.Holes.Add(Hole);
    }
}
