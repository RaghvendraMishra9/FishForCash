using FishForCash.Business.Interfaces;
using FishForCash.Repository;
using FishForCash.Repository.DB;
using FishForCash.Repository.Interface;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FishForCash.Business.Concrete
{
    public class TransactionBusiness : ITransactionBusiness
    {
        private readonly TransactionRepository transactionRepository;
        public TransactionBusiness(IUnitOfWork unit)
        {
            transactionRepository = new TransactionRepository(unit);
        }
         public List<Transaction> GetTransactionList(int playerid)
        {
           return transactionRepository.GetAll(x => x.PLayerId == playerid).OrderByDescending(x => x.TransactionDate).ToList();
        }
        public void InsertTransaction(Transaction model)
        {
            transactionRepository.Insert(model);
        }
    }
}
