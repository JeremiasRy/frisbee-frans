using backend.Db;
using backend.DTOs;
using backend.Models;
using backend.Services.Abstraction;

namespace backend.Services.Impl;

public class HoleResultService : CrudService<HoleResult, HoleResultDTO>
{
    public HoleResultService(AppDbContext appDbContext) : base(appDbContext)
    {
    }
}
