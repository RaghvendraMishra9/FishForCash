using FishForCash.Domain.BootyTrade;
using FishForCash.Repository.DB;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace FishForCash.Web.Models
{
    public class TradeBootyViewModel
    {
        public List<KeyValuePair<int,string>> BootyIconList { get; set; }
        public List<BootyTradeModel> OfferedBooty { get; set; }
        public int OfferedBootyCount { get; set; }

        public List<BootyTradeModel> Wantedtradebooty { get; set; }
        public int WantedtradebootyCount { get; set; }
        public List<BootyTradeModel> AllAvailableTrades { get; set; }
        public int AllAvailableTradesCount { get; set; }
        public string Icon { get; set; }
        public int OfferedWantedtradebootyCount { get { return OfferedBootyCount + WantedtradebootyCount; } }
        public int TradeQty { get; set; }
        public int BootyId { get; set; }
        public List<BootyTradeModel> TradeNotinProcess { get; set; }
    }
}
