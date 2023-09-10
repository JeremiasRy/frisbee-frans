using backend.Common.Filters;
using backend.Db;
using backend.DTOs;
using backend.Models;
using Microsoft.EntityFrameworkCore;

namespace backend.Services.Abstraction;

public class CrudService<TModel, TDto> : ICrudService<TModel, TDto>
    where TModel : BaseModel, new()
    where TDto : BaseDTO<TModel>
{
    protected readonly AppDbContext _appDbContext;
    public CrudService(AppDbContext appDbContext)
    {
        _appDbContext = appDbContext;
    }
    public virtual async Task<TModel> GetByIdAsync(int id)
    {
        return await _appDbContext
            .Set<TModel>()
            .SingleOrDefaultAsync(item => item.Id == id) ?? throw new Exception($"Did not find item with id: {id}");
    }
    public virtual async Task<List<TModel>> GetAllAsync(IFilterOptions request)
    {
        if (request is BaseQuery pagination)
        {
            return await _appDbContext
                .Set<TModel>()
                .OrderBy(item => item.CreatedAt)
                .Skip(pagination.PageSize * (pagination.Page - 1))
                .Take(pagination.PageSize)
                .ToListAsync();
        }
        return await _appDbContext
            .Set<TModel>()
            .Skip(0)
            .Take(20)
            .ToListAsync();

    }
    public virtual async Task<TModel> CreateOneAsync(TDto request)
    {
        TModel item = new();
        request.UpdateModel(item);
        _appDbContext.Add(item);
        await _appDbContext.SaveChangesAsync();
        return item;
    }
    public virtual async Task<TModel> UpdateOneAsync(int id, TDto request)
    {
        TModel item = await GetByIdAsync(id);
        request.UpdateModel(item);
        _appDbContext.Update(item);
        await _appDbContext.SaveChangesAsync();
        return item;
    }
    public virtual async Task<TModel> DeleteOneAsync(int id)
    {
        TModel item = await GetByIdAsync(id);
        _appDbContext.Remove(item);
        await _appDbContext.SaveChangesAsync();
        return item;
    }
}
