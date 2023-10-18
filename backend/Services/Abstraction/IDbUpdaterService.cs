namespace backend.Services.Abstraction;

public interface IDbUpdaterService
{
    Task UpdateRoundCountAsync(CancellationToken cancellationToken);
}
