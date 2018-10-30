using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FishForCash.Domain.Transaction
{
   public class TransactionModel
    {
        public int TransactionId { get; set; }
        public string Description { get; set; }
        public string TransactionType { get; set; }
        public string TransactionValue { get; set; }
        public int? PLayerId { get; set; }     
        public string GameCode { get; set; }
        public string Status { get; set; }
        public DateTime TransactionDate { get; set; }
        public string TransactionDatestr { get; set; }
    }
}
