using System;
using kpi_learning.core.Context;

namespace kpi_learning.core.UnitOfWork
{
    public class UnitOfWork : IUnitOfWork, IDisposable
    {       
        private KpiContext _dbContext;
 
        public UnitOfWork(KpiContext dbContext)
        {
            this._dbContext = dbContext;
        }        

        public void SaveChanges()
        {
            _dbContext.SaveChanges();
        }

        private bool isDisposed;        
 
        public void Dispose()
        {
            Dispose(true);
            GC.SuppressFinalize(this);
        }
        private void Dispose(bool disposing)
        {
            if (!isDisposed && disposing)
            {
                DisposeCore();
            }
 
            isDisposed = true;
        }
 
        // Ovveride this to dispose custom objects
        protected virtual void DisposeCore()
        {
        }
    }
}