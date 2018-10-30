using Microsoft.EntityFrameworkCore;
using FishForCash.Repository.Interface;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Text;
using System.Threading.Tasks;

namespace FishForCash.Repository.Concrete
{
    public class BaseRepository<T> : IBaseRepository<T> where T : class
    {
        IUnitOfWork unit;
        DbSet<T> dbset;
        public BaseRepository(IUnitOfWork _unit)
        {
            unit = _unit;
            dbset = unit.DB.Set<T>();
        }
        public T SingleOrDefault(Expression<Func<T, bool>> whereCondition)
        {
            return dbset.FirstOrDefault(whereCondition);
        }
        public T SingleOrDefault()
        {
            return dbset.FirstOrDefault();
        }
        public IQueryable<T> GetAll()
        {
            return dbset.AsQueryable();
        }
        public virtual List<T> GetAll(Expression<Func<T, bool>> filter = null,
           Func<IQueryable<T>, IOrderedEnumerable<T>> orderBy = null,
           string includeProperties = "")
        {
            IQueryable<T> query = dbset;

            if (filter != null)
            {
                query = query.Where(filter);
            }

            foreach (string includeProperty in includeProperties.Split(new char[] { ',' }, StringSplitOptions.RemoveEmptyEntries))
            {
                query = query.Include(includeProperty);
            }

            if (orderBy != null)
            {
                return orderBy(query).ToList();
            }

            return query.ToList();
        }
        public virtual T FindBy(Expression<Func<T, bool>> predicate, string includeProperties = "")
        {
            IQueryable<T> query = dbset;
            foreach (string includeProperty in includeProperties.Split(new char[] { ',' }, StringSplitOptions.RemoveEmptyEntries))
            {
                query = query.Include(includeProperty);
            }
            return query.Where(predicate).FirstOrDefault();
        }
        public int Count(Expression<Func<T, bool>> whereCondition)
        {
            return dbset.Count(whereCondition);
        }
        public bool Exists(Expression<Func<T, bool>> whereCondition)
        {
            return dbset.Any(whereCondition);
        }

        public IQueryable<T> GetAll(Expression<Func<T, bool>> whereCondition)
        {
            return dbset.Where(whereCondition).AsQueryable();
        }
        public void Insert(T entity)
        {
            dbset.Add(entity);
            unit.DB.SaveChanges();
        }
        public void InsertList(List<T> entity)
        {
            foreach (var item in entity)
            {
              dbset.Add(item);
            }
            unit.DB.SaveChanges();
        }
        public void Update(T entity)
        {
            unit.DB.Entry(entity).State = EntityState.Modified;
            unit.DB.SaveChanges();
        }

        public void Delete(Expression<Func<T, bool>> whereCondition)
        {
            T entity = SingleOrDefault(whereCondition);
            dbset.Remove(entity);
            unit.DB.SaveChanges();
        }
        public void DeleteList(List<T> entity)
        {
            try
            {
                foreach (var item in entity)
                {
                    dbset.Remove(item);
                }
                unit.DB.SaveChanges();
            }
            catch (Exception ex)
            {

                throw;
            }
           
          
        }
        public void DeleteList(Expression<Func<T, bool>> whereCondition)
        {
            T entity = SingleOrDefault(whereCondition);
            dbset.Remove(entity);
            unit.DB.SaveChanges();
        }

        public T GetAllLazyLoad(Expression<Func<T, bool>> filter, params Expression<Func<T, object>>[] children)
        {
            children.ToList().ForEach(x => dbset.Include(x).Load());
            return dbset.FirstOrDefault(filter);
        }
    }
}
