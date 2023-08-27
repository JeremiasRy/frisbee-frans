namespace backend.Models;

public class Course : BaseModel
{
    public string Name { get; set; } = null!;
    public List<Hole> Holes { get; set; } = null!;
}
