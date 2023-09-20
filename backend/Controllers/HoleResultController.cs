using backend.Common.Filters;
using backend.Controllers.Abstraction;
using backend.DTOs;
using backend.Models;
using backend.Services.Abstraction;
using Backend.Src.Common;

namespace backend.Controllers;

public class HoleResultController : CrudController<HoleResult, HoleResultDTO>
{
    public HoleResultController(ICrudService<HoleResult, HoleResultDTO> service) : base(service)
    {  
    }
    public async override Task<List<HoleResult>> GetAll()
    {
        var filter = Request.QueryString.ParseParams<IdFilter>() ?? new BaseQuery();
        return await _service.GetAllAsync(filter);
    }
}
