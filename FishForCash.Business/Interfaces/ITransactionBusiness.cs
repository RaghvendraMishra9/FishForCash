using FishForCash.Repository.DB;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FishForCash.Business.Interfaces
{
   public interface ITransactionBusiness
    {
        void InsertTransaction(Transaction model);
        List<Transaction> GetTransactionList(int playerid);
    }
}
