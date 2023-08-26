using backend.Models;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using Npgsql;

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
            .UseSnakeCaseNamingConvention();
    }
    protected override void OnModelCreating(ModelBuilder builder)
    {
        base.OnModelCreating(builder);

        builder
            .Entity<HoleResult>()
            .HasOne(holeResult => holeResult.User)
            .WithOne();

        builder
            .Entity<HoleResult>()
            .HasOne(holeResult => holeResult.Hole)
            .WithOne();

        builder
            .Entity<HoleResult>()
            .HasKey(holeResult => new { holeResult.UserId, holeResult.HoleId });

        builder
            .Entity<Round>()
            .HasMany(round => round.RoundResult)
            .WithOne();
    }
}
