using backend.Models;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;

namespace backend.Db;

public class AppDbContext : IdentityDbContext<User, IdentityRole<int>, int>
{
    private readonly IConfiguration _config;
    public AppDbContext(IConfiguration config)
    {
        _config = config;
    }
    static AppDbContext() => AppContext.SetSwitch("Npgsql.EnableLegacyTimestampBehavior", true);
    protected override void OnConfiguring(DbContextOptionsBuilder options)
    {
        string connectionString = _config.GetConnectionString("Default");

        options
            .UseNpgsql(connectionString)
            .AddInterceptors(new AppDbContextSaveChangesInterceptors())
            .UseSnakeCaseNamingConvention();
    }
    protected override void OnModelCreating(ModelBuilder builder)
    {
        builder.Entity<Course>()
            .Navigation(course => course.Holes)
            .AutoInclude();

        builder.Entity<User>()
            .Navigation(user => user.Rounds)
            .AutoInclude();

        builder.Entity<HoleResult>()
            .Navigation(holeResult => holeResult.Hole)
            .AutoInclude();

        builder.Entity<Round>()
            .Navigation(round => round.RoundResult)
            .AutoInclude();

        base.OnModelCreating(builder);
    }
}
