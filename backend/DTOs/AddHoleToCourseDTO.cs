using backend.Models;

namespace backend.DTOs;

public class AddHoleToCourseDTO
{
    public int CourseId { get; set; }
    public Hole Hole { get; set; } = null!; 
}
