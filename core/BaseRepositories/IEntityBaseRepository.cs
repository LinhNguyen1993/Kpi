using System;
using System.Collections.Generic;
using System.Linq.Expressions;
using System.Threading.Tasks;
using kpi.Entities;

namespace kpi.core.BaseRepositories
{
    public interface IEntityBaseRepository<T> where T : class, IEntityBase, new()
    {        
        IEnumerable<T> GetAll();
        Task<IEnumerable<T>> GetAllAsync();
        T GetSingle(int id);
        T GetSingle(Expression<Func<T, bool>> predicate);
        Task<T> GetSingleAsync(int id);
        IEnumerable<T> FindBy(Expression<Func<T, bool>> predicate);
        Task<IEnumerable<T>> FindByAsync(Expression<Func<T, bool>> predicate);
        void Add(T entity);
        void Delete(T entity);
        void Edit(T entity);
    }
}