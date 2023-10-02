using backend.Common.Filters;
using backend.Controllers.Abstraction;
using backend.DTOs;
using backend.Models;
using backend.Services;
using Backend.Src.Common;
using Microsoft.AspNetCore.Mvc;

namespace backend.Controllers;

public class HoleResultController : CrudController<HoleResult, HoleResultDTO>
{
    private readonly IHoleResultService _holeResultService;
    public HoleResultController(IHoleResultService service) : base(service)
    {  
        _holeResultService = service;
    }
    public async override Task<List<HoleResult>> GetAll()
    {
        var filter = Request.QueryString.ParseParams<CommonFilter>() ?? new BaseQuery();
        return await _service.GetAllAsync(filter);
    }
    [HttpPost("many")]
    public async Task<List<HoleResult>> CreateMany([FromBody] HoleResultDTO[] request)
    {
        return await _holeResultService.CreateMany(request);
    }
    [HttpPut("many")]
    public async Task<List<HoleResult>> UpdateMany([FromBody] HoleResultWithIdDTO[] request)
    {
        return await _holeResultService.UpdateMany(request);
    }
}
