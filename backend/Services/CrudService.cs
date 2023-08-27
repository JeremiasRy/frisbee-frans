using backend.Db;
using backend.DTOs;
using backend.Models;
using Microsoft.EntityFrameworkCore;

namespace backend.Services;

public class CrudService<TModel, TDto> : ICrudService<TModel, TDto> where TModel : BaseModel, new()
    where TDto : BaseDTO<TModel>
{
    private readonly AppDbContext _appDbContext;
    public CrudService(AppDbContext appDbContext)
    {
        _appDbContext = appDbContext;
    }
    public async Task<TModel> GetByIdAsync(int id)
    {
        return await _appDbContext
            .Set<TModel>()
            .SingleOrDefaultAsync(item => item.Id == id) ?? throw new Exception($"Did not find item with id: {id}");
    }
    public async Task<List<TModel>> GetAllAsync()
    {
        return await _appDbContext
            .Set<TModel>()
            .ToListAsync();
    }
    public async Task<TModel> CreateOneAsync(TDto request)
    {
        TModel item = new();
        request.UpdateModel(item);
        _appDbContext.Add(item);
        await _appDbContext.SaveChangesAsync();
        return item;
    }
    public async Task<TModel> UpdateOneAsync(int id, TDto request)
    {
        TModel item = await GetByIdAsync(id);
        request.UpdateModel(item);
        _appDbContext.Update(item);
        await _appDbContext.SaveChangesAsync();
        return item;
    }
    public async Task RemoveOneAsync(int id)
    {
        TModel item = await GetByIdAsync(id);
        _appDbContext.Remove(item);
        await _appDbContext.SaveChangesAsync();
    }
}
