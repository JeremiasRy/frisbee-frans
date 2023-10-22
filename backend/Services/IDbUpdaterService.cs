namespace backend.Services;

public interface IDbUpdaterService
{
    Task UpdateRoundCountAsync(CancellationToken cancellationToken);
}
