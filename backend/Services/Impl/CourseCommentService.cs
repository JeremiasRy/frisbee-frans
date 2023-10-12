using backend.Common.Filters;
using backend.Db;
using backend.DTOs;
using backend.Models;
using backend.Services.Abstraction;

namespace backend.Services.Impl;

public class CourseCommentService : CrudCommentService<CourseComment, CourseCommentDTO>
{
    public CourseCommentService(AppDbContext appDbContext) : base(appDbContext)
    {
    }
}
