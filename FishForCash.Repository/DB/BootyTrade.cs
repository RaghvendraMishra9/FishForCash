using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FishForCash.Repository.DB
{
   public class BootyTrade
    {
        [Key]
        public int BootyTradeId { get; set; }
        public int SellerPlayerId { get; set; }
        public string TradeBooty { get; set; }
        public int TradeQty { get; set; }
        public string TradeForBooty { get; set; }
        public int TradeForQty { get; set; }
        public int BuyerPlayerId { get; set; }
        public DateTime? TradeDate { get; set; }
    }
}
