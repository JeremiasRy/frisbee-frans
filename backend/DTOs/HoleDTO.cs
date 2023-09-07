using backend.Models;
using Npgsql.Internal.TypeHandling;

namespace backend.DTOs;

public class HoleDTO : BaseDTO<Hole>
{
    public int Par { get; set; }
    public int Length { get; set; }
    public int NthHole { get; set; }
    public int CourseId { get; set; }

    public override void UpdateModel(Hole model)
    {
        model.Par = Par;
        model.Length = Length;
        model.NthHole = NthHole;
        model.CourseId = CourseId;
    }
}
