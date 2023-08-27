using backend.Models;

namespace backend.DTOs;

public class CourseDTO : BaseDTO<Course>
{
    public string Name { get; set; } = null!;
    public override void UpdateModel(Course model)
    {
        model.Name = Name;
    }
}
