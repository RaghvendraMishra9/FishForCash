using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Text;
using System.Threading.Tasks;

namespace FishForCash.Repository.Interface
{
    public interface IBaseRepository<T>
    {
        T SingleOrDefault(Expression<Func<T, bool>> whereCondition);
        T SingleOrDefault();
        IQueryable<T> GetAll();
        IQueryable<T> GetAll(Expression<Func<T, bool>> whereCondition);
        void Insert(T entity);
        void Update(T entity);
        void Delete(Expression<Func<T, bool>> whereCondition);
        int Count(Expression<Func<T, bool>> whereCondition);
        bool Exists(Expression<Func<T, bool>> whereCondition);
        T GetAllLazyLoad(Expression<Func<T, bool>> filter, params Expression<Func<T, object>>[] children);

        List<T> GetAll(Expression<Func<T, bool>> filter = null,
                       Func<IQueryable<T>, IOrderedEnumerable<T>> orderBy = null,
                       string includeProperties = "");

    }
}
