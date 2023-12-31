﻿using backend.Common.Filters;
using backend.Db;
using backend.DTOs;
using backend.Models;
using backend.Services.Abstraction;

namespace backend.Services.Impl;

public class HoleCommentService : CrudCommentService<HoleComment, HoleCommentDTO>
{
    public HoleCommentService(AppDbContext appDbContext) : base(appDbContext)
    {
    }
}
