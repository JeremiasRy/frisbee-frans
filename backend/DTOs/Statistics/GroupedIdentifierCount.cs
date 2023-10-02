using backend.Models;

namespace backend.DTOs.Statistics;

public class GroupedIdentifierCount
{
    public HoleResult.ResultIdentifier? Identifier { get; set; }
    public int Count { get; set; }

    public static GroupedIdentifierCount FromGroup(IGrouping<HoleResult.ResultIdentifier?, HoleResult> group)
    {
        return new GroupedIdentifierCount
        {
            Identifier = group.Key,
            Count = group.Count()
        };
    }
}
