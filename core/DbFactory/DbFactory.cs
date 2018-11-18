using kpi_learning.core.Context;
using Microsoft.AspNetCore.Server.Kestrel.Core.Internal.Infrastructure;
using Microsoft.EntityFrameworkCore;

namespace kpi_learning.core.DbFactory
{
    public class DbFactory : Disposable, IDbFactory
    {
        KpiContext dbContext;
        DbContextOptions<KpiContext> options;
        public KpiContext Init()
        {            
            return dbContext ?? (dbContext = new KpiContext(options));
        }
 
        protected override void DisposeCore()
        {
            if (dbContext != null)
                dbContext.Dispose();
        }
    }
}