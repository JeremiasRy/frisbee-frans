using backend.DTOs;
using backend.Models;
using backend.Services.Abstraction;

namespace backend.Services;

public interface IHoleResultService : ICrudService<HoleResult, HoleResultDTO>
{
    Task<List<HoleResult>> CreateMany(HoleResultDTO[] emptyRound);
    Task<List<HoleResult>> UpdateMany(HoleResultWithIdDTO[] request);
}