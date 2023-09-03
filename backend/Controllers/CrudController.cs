using backend.Models;
using backend.Services.Abstraction;
using Microsoft.AspNetCore.Mvc;

namespace backend.Controllers;

public class CrudController<TModel, TDto>: ApiControllerBase
{
    private readonly ICrudService<TModel, TDto> _service;
    public CrudController(ICrudService<TModel, TDto> service)
    {
        _service = service;
    }
    [HttpGet]
    public async Task<List<TModel>> GetAll()
    {
        return await _service.GetAllAsync();
    }
    [HttpGet("{id:int}")]
    public async Task<TModel> GetById([FromRoute] int id)
    {
        return await _service.GetByIdAsync(id);
    }
    [HttpPost]
    public async Task<TModel> CreateOne(TDto request)
    {
        return await _service.CreateOneAsync(request);
    }
    [HttpPut("{id:int}")]
    public async Task<TModel> UpdateOne([FromRoute] int id, TDto request)
    {
        return await _service.UpdateOneAsync(id, request);
    }
    [HttpDelete("{id:int}")]
    public async Task<TModel> DeleteOne([FromRoute] int id)
    {
        return await _service.DeleteOneAsync(id);
    }
}
