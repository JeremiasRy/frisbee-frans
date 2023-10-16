using backend.Common.Filters;
using backend.Db;
using backend.DTOs;
using backend.Models;
using Microsoft.EntityFrameworkCore;

namespace backend.Services.Abstraction;

public class CrudCommentService<TCommentModel, TCommentDTO> : CrudService<TCommentModel, TCommentDTO> 
    where TCommentModel : Comment, new() 
    where TCommentDTO : CommentDTO<TCommentModel>
{
    public CrudCommentService(AppDbContext appDbContext) : base(appDbContext)
    {
    }
    public async override Task<TCommentModel> GetByIdAsync(int id)
    {
        return await _appDbContext
            .Set<TCommentModel>()
            .IgnoreAutoIncludes()
            .Include(comment => comment.User)
            .SingleOrDefaultAsync(comment => comment.Id == id) ?? throw new Exception("No entity found?");
    }
    public async override Task<List<TCommentModel>> GetAllAsync(IFilterOptions request)
    {
        if (request is Relationfilter filter)
        {
            return await _appDbContext
                .Set<TCommentModel>()
                .IgnoreAutoIncludes()
                .Include(comment => comment.User)
                .Where(comment => comment.RelationId == filter.RelationId)
                .OrderByDescending(comment => comment.CreatedAt)
                .Skip(filter.PageSize * (filter.Page - 1))
                .Take(filter.PageSize)
                .ToListAsync();
        }
        return await _appDbContext
            .Set<TCommentModel>()
            .IgnoreAutoIncludes()
            .OrderByDescending(comment => comment.CreatedAt)
            .Include(comment => comment.User)
            .Take(20)
            .ToListAsync();
    }
}
