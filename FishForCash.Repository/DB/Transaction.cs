using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FishForCash.Repository.DB
{
  public class Transaction
    {
        [Key]
        public int TransactionId { get; set; }
        public string Description { get; set; }
        public string TransactionType { get; set; }
        public string TransactionValue { get; set; }
        public int? PLayerId { get; set; }
        [ForeignKey("PLayerId")]
        public virtual Player Player { get; set; }
        public string GameCode { get; set; }
        public string Status { get; set; }
        public DateTime TransactionDate { get; set; }
        public double? AmountAwarded { get; set; }
    }
}
