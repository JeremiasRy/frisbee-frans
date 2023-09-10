using backend.Common.Filters;

namespace backend.Services.Abstraction;

public interface ICrudService<TModel, TDto>
{
    Task<TModel> CreateOneAsync(TDto request);
    Task<List<TModel>> GetAllAsync(IFilterOptions pagination);
    Task<TModel> GetByIdAsync(int id);
    Task<TModel> UpdateOneAsync(int id, TDto request);
    Task<TModel> DeleteOneAsync(int id);
}