using backend.Common.Filters;
using backend.Models;
using backend.Services.Abstraction;
using Backend.Src.Common;
using Microsoft.AspNetCore.Mvc;

namespace backend.Controllers.Abstraction;

public class CrudController<TModel, TDto> : ApiControllerBase
{
    private protected readonly ICrudService<TModel, TDto> _service;
    public CrudController(ICrudService<TModel, TDto> service)
    {
        _service = service;
    }
    [HttpGet]
    public virtual async Task<List<TModel>> GetAll()
    {
        BaseQuery filter = Request.QueryString.ParseParams<BaseQuery>() ?? new BaseQuery();
        return await _service.GetAllAsync(filter);
    }
    [HttpGet("{id:int}")]
    public virtual async Task<TModel> GetById([FromRoute] int id)
    {
        return await _service.GetByIdAsync(id);
    }
    [HttpPost]
    public virtual async Task<TModel> CreateOne([FromBody] TDto request)
    {
        return await _service.CreateOneAsync(request);
    }
    [HttpPut("{id:int}")]
    public virtual async Task<TModel> UpdateOne([FromRoute] int id, TDto request)
    {
        return await _service.UpdateOneAsync(id, request);
    }
    [HttpDelete("{id:int}")]
    public virtual async Task<TModel> DeleteOne([FromRoute] int id)
    {
        return await _service.DeleteOneAsync(id);
    }
}
