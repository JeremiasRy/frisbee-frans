using backend.Db;
using backend.DTOs;
using backend.Models;
using backend.Services.Abstraction;

namespace backend.Services.Impl;

public class RoundCommentService : CrudCommentService<RoundComment, RoundCommentDTO>
{
    public RoundCommentService(AppDbContext appDbContext) : base(appDbContext)
    {
    }
}
