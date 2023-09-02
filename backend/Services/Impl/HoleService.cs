using backend.Db;
using backend.DTOs;
using backend.Models;
using backend.Services.Abstraction;

namespace backend.Services.Impl;

public class HoleService : CrudService<Hole, HoleDTO>
{
    public HoleService(AppDbContext appDbContext) : base(appDbContext)
    {
    }
}
