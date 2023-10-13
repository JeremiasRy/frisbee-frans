using backend.Common.Filters;
using backend.Services.Abstraction;
using Backend.Src.Common;
using System.Reflection.Metadata.Ecma335;

namespace backend.Controllers.Abstraction;

public class CrudCommentController<TCommentModel, TCommentDTO> : CrudController<TCommentModel, TCommentDTO>
{
    public CrudCommentController(ICrudService<TCommentModel, TCommentDTO> service) : base(service)
    {
    }
    public async override Task<List<TCommentModel>> GetAll()
    {
        var query = Request.QueryString.ParseParams<Relationfilter>();
        if (query is null)
        {
            return await base.GetAll();
        }
        return await _service.GetAllAsync(query);
    }
}
