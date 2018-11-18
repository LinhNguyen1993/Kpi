using System;
using System.Collections.Generic;
using System.Linq.Expressions;
using System.Threading.Tasks;
using kpi_learning.Entities;
using kpi_learning.core.BaseRepositories;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.ChangeTracking;
using kpi_learning.core.Context;
using System.Linq;
using kpi_learning.core.DbFactory;

namespace kpi_learning.core.BaseRepositories
{
    public class EntityBaseRepository<T> : IEntityBaseRepository<T> where T : class, IEntityBase, new()
    {
        private KpiContext _context;                     
        public EntityBaseRepository(KpiContext context)
        {
            _context = context;            
        }
        public void Add(T entity)
        {
            EntityEntry dbEntityEntry = _context.Entry<T>(entity);
           _context.Set<T>().Add(entity);
        }

        public void Delete(T entity)
        {
            EntityEntry dbEntityEntry = _context.Entry<T>(entity);
            dbEntityEntry.State = EntityState.Deleted;
        }

        public void Edit(T entity)
        {
            EntityEntry dbEntityEntry = _context.Entry<T>(entity);
            dbEntityEntry.State = EntityState.Modified;
        }

        public IEnumerable<T> FindBy(Expression<Func<T, bool>> predicate)
        {
            throw new NotImplementedException();
        }

        public async Task<IEnumerable<T>> FindByAsync(Expression<Func<T, bool>> predicate)
        {
            return await _context.Set<T>().Where(predicate).ToListAsync();
        }

        public IEnumerable<T> GetAll()
        {
            return _context.Set<T>().AsEnumerable();
        }

        public async Task<IEnumerable<T>> GetAllAsync()
        {
            return await _context.Set<T>().ToListAsync();
        }

        public T GetSingle(int id)
        {
            throw new NotImplementedException();
        }

        public T GetSingle(Expression<Func<T, bool>> predicate)
        {
            throw new NotImplementedException();
        }

        public Task<T> GetSingleAsync(int id)
        {
            throw new NotImplementedException();
        }
    }
}