using kpi.core.Context;
using kpi.core.DbFactory;

namespace kpi.core.UnitOfWork
{
    public class UnitOfWork : IUnitOfWork
    {
        private readonly IDbFactory dbFactory;
        private KpiContext dbContext;
 
        public UnitOfWork(IDbFactory dbFactory)
        {
            this.dbFactory = dbFactory;
        }
 
        public KpiContext DbContext
        {
            get { return dbContext ?? (dbContext = dbFactory.Init()); }
        }
 
        public void SaveChanges()
        {
            DbContext.SaveChanges();
        }
    }
}