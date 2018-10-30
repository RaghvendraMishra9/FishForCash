using FishForCash.Domain.Player;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FishForCash.Domain.PrizeRedeemModel
{
   public class PrizeRedeemModel
    {
       
        public int PrizeRedeemId { get; set; }
        public int? PLayerId { get; set; }
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
        
        public string DateRedeemdstr
        {
            get
            {
                return DateRedeemd != null ? string.Format("{0: dd MMM yyyy}", DateRedeemd) : string.Empty;
            }
        }
        public string PrizeValuestr
        {
            get
            {
                return  string.Format("{0:c}", PrizeValue) ;
            }
        }
        public string FullName { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string Address { get; set; }
        public string Email { get; set; }
        public string Address1 { get; set; }
        public string Address2 { get; set; }
        public string City { get; set; }
        public string DatePostedstr { get; set; }
    }
}
