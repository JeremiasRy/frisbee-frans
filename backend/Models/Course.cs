namespace backend.Models;

public class Course : BaseModel
{
    public int Name { get; set; }
    public List<Hole> Layout { get; set; } = null!;
}
