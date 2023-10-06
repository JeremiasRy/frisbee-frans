namespace backend.Models;

public class City : BaseModel
{
    public string Name { get; set; } = null!;
    public string NameNormalized { get; set; } = null!;
}
