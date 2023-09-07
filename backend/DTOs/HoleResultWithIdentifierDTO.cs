using backend.Models;

namespace backend.DTOs;

public class HoleResultWithIdentifierDTO : HoleResult
{
    public ResultIdentifier Identifier { get; set; }
}
