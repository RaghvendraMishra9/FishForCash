using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FishForCash.Domain.BootyTrade
{
  public class BootyTradeModel
    {
        public int BootyTradeId { get; set; }
        public int SellerPlayerId { get; set; }
        public string TradeBooty { get; set; }
        public int TradeQty { get; set; }
        public string TradeForBooty { get; set; }
        public int TradeForQty { get; set; }
        public int BuyerPlayerId { get; set; }
        public DateTime? TradeDate { get; set; }
        public string TradeDatestr { get
            {
                return TradeDate != null ? string.Format("{0:dd MMM}<br/>{0: hh:mm tt}", TradeDate, TradeDate) : string.Empty;
               
                
              }
        }
        public string Status { get; set; }
        public int PlayerId { get; set; }
    }
}
