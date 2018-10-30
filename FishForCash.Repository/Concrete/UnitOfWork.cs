using FishForCash.Repository.DB;
using FishForCash.Repository.Interface;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FishForCash.Repository.Concrete
{
   public class UnitOfWork:IUnitOfWork
    {
        ApplicationDbContext entities;
        private bool disposed;
        public UnitOfWork(ApplicationDbContext _entities)
        {
            if (entities != null)
            {
                entities.Dispose();
            }
            entities = _entities;
        }
       
        ApplicationDbContext IUnitOfWork.DB { get { return entities; } }
        

        public void Dispose()
        {
            Dispose(true);
            GC.SuppressFinalize(this);
        }
        public virtual void Dispose(bool disposing)
        {
            if (!disposed)
            {
                if (disposing)
                {
                    entities.Dispose();
                }
            }
            disposed = true;
        }
    }
}
