using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FishForCash.Repository.DB
{
   public class PrizeRedeem
    {
        [Key]
        public int PrizeRedeemId { get; set; }
        public int? PLayerId { get; set; }
        [ForeignKey("PLayerId")]
        public virtual Player Player { get; set; }
        public double? PrizeValue { get; set; }
        public DateTime? DateRedeemd { get; set; }
        public bool RedeemedProduct { get; set; }
        public int Voucher { get; set; }
        public string Cheque { get; set; }
        public DateTime? DatePosted { get; set; }
        public bool Processed { get; set; }
        public int SPCABranchId { get; set; }
        public DateTime? SSMATimestamp { get; set; }
        public bool SPCADonation { get; set; }

    }
}
