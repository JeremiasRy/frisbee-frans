using backend.Common.Filters;
using backend.Db;
using backend.DTOs;
using backend.Models;
using backend.Services.Abstraction;
using Microsoft.EntityFrameworkCore;
using System.Linq;
using System.Runtime.CompilerServices;

namespace backend.Services.Impl;

public class HoleCommentService : CrudService<HoleComment, HoleCommentDTO>
{
    public HoleCommentService(AppDbContext appDbContext) : base(appDbContext)
    {
    }
    public async override Task<HoleComment> GetByIdAsync(int id)
    {
        return await _appDbContext
            .Set<HoleComment>()
            .IgnoreAutoIncludes()
            .Include(comment => comment.User)
            .SingleOrDefaultAsync(comment => comment.Id == id) ?? throw new Exception("No entity found?");
    }
    public async override Task<List<HoleComment>> GetAllAsync(IFilterOptions request)
    {
        if (request is BaseQuery filter)
        {
            return await _appDbContext
                .Set<HoleComment>()
                .IgnoreAutoIncludes()
                .Include(comment => comment.User)
                .Skip(filter.PageSize * (filter.Page - 1))
                .Take(filter.PageSize)
                .ToListAsync();
        }
        return await _appDbContext
            .Set<HoleComment>()
            .IgnoreAutoIncludes()
            .Include(comment => comment.User)
            .Take(20)
            .ToListAsync();
    }
}
