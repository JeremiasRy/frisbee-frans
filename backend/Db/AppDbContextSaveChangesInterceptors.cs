using backend.Models;
using Microsoft.EntityFrameworkCore.Diagnostics;

namespace backend.Db
{
    public class AppDbContextSaveChangesInterceptors : SaveChangesInterceptor
    {
        public void UpdateTimestamps(DbContextEventData data)
        {
            var entries = data.Context!.ChangeTracker
                .Entries()
                .Where(entry => entry.Entity is BaseModel && (entry.State == Microsoft.EntityFrameworkCore.EntityState.Added || entry.State == Microsoft.EntityFrameworkCore.EntityState.Modified));

            foreach (var entry in entries)
            {
                if (entry.State == Microsoft.EntityFrameworkCore.EntityState.Added)
                {
                    ((BaseModel)entry.Entity).CreatedAt = DateTime.Now;
                } else
                {
                    ((BaseModel)entry.Entity).UpdatedAt = DateTime.Now;
                }
                    
            }
        }
        public override ValueTask<InterceptionResult<int>> SavingChangesAsync(DbContextEventData eventData, InterceptionResult<int> result, CancellationToken cancellationToken = default)
        {
            UpdateTimestamps(eventData);
            return base.SavingChangesAsync(eventData, result, cancellationToken);
        }
    }
}