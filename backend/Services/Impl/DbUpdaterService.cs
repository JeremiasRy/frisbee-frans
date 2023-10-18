using backend.Db;
using backend.Services.Abstraction;
using Microsoft.EntityFrameworkCore;

namespace backend.Services.Impl;

public class DbUpdaterService : IDbUpdaterService
{
    private readonly AppDbContext _appDbContext;
    private readonly ILogger<DbUpdaterService> _logger;
    public DbUpdaterService(AppDbContext appDbContext, ILogger<DbUpdaterService> logger)
    {
        _appDbContext = appDbContext;
        _logger = logger;
    }
    public async Task UpdateRoundCountAsync(CancellationToken cancellationToken)
    {
        while (!cancellationToken.IsCancellationRequested)
        {
            _logger.LogInformation("Starting to update");
            using var sr = new StreamReader("Querys/UpdateCourseRoundCount.sql");
            var query = sr.ReadToEnd();
            await _appDbContext.Database.ExecuteSqlRawAsync(query, cancellationToken);
            await _appDbContext.SaveChangesAsync(cancellationToken);
            _logger.LogInformation("Rounds updated");
            await Task.Delay(TimeSpan.FromMinutes(1), cancellationToken);
        }
    }
}
