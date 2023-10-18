using backend.Db;
using backend.Services.Abstraction;
using Microsoft.EntityFrameworkCore;
using Microsoft.OpenApi.Writers;

namespace backend.Services.Impl;

public class BackgroundWorker : BackgroundService, IHostedService
{
    private readonly IServiceProvider _services;
    public BackgroundWorker(IServiceProvider services, ILogger<BackgroundWorker> logger)
    {
        _services = services;
    }

    public override async Task StopAsync(CancellationToken stoppingToken)
    {
        await base.StopAsync(stoppingToken);
    }

    protected override async Task ExecuteAsync(CancellationToken stoppingToken)
    {
        await DoWork(stoppingToken);
    }

    private async Task DoWork(CancellationToken stoppingToken)
    {
        using (var scope = _services.CreateScope())
        {
            var roundUpdater = scope.ServiceProvider.GetRequiredService<IDbUpdaterService>();
            await roundUpdater.UpdateRoundCountAsync(stoppingToken);
        }
    }

}
