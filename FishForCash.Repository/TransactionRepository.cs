using FishForCash.Repository.Concrete;
using FishForCash.Repository.DB;
using FishForCash.Repository.Interface;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FishForCash.Repository
{
   public class TransactionRepository : BaseRepository<Transaction>
    {
        public TransactionRepository(IUnitOfWork unit) : base(unit)
        { }
    }
}
