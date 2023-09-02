using backend.DTOs;
using backend.Models;

namespace backend.Services.Abstraction;

public interface ICrudService<TModel, TDto>
    where TModel : BaseModel, new()
    where TDto : BaseDTO<TModel>
{
    Task<TModel> CreateOneAsync(TDto request);
    Task<List<TModel>> GetAllAsync();
    Task<TModel> GetByIdAsync(int id);
    Task RemoveOneAsync(int id);
    Task<TModel> UpdateOneAsync(int id, TDto request);
}