using backend.Common.Filters;
using backend.Controllers.Abstraction;
using backend.DTOs;
using backend.Models;
using backend.Services.Abstraction;
using Backend.Src.Common;

namespace backend.Controllers;

public class RoundController : CrudController<Round, RoundDTO>
{
    public RoundController(ICrudService<Round, RoundDTO> service) : base(service)
    {
        
    }
    public override async Task<List<Round>> GetAll()
    {
        var filter = Request.QueryString.ParseParams<CommonFilter>();
        if (filter == null)
        {
            return await base.GetAll();
        }
        return await _service.GetAllAsync(filter);
    }
}
