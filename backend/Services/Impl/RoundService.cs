using backend.Db;
using backend.DTOs;
using backend.Models;
using backend.Services.Abstraction;

namespace backend.Services.Impl;

public class RoundService : CrudService<Round, RoundDTO>
{
    public RoundService(AppDbContext appDbContext) : base(appDbContext)
    {
    }
}
