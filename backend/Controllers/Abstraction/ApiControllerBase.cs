using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Net.Mime;

namespace backend.Controllers.Abstraction;

[ApiController]
[Produces(MediaTypeNames.Application.Json)]
[Consumes(MediaTypeNames.Application.Json)]
[Route("[controller]s")]
[Authorize]
public abstract class ApiControllerBase : ControllerBase
{
}
