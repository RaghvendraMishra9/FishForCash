using FishForCash.Domain.BootyTrade;
using FishForCash.Repository.DB;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FishForCash.Business.Interfaces
{
   public interface IBootyTradeBusiness
    {
        void InsertBootyTrade(BootyTrade model);
        List<BootyTradeModel> BootyTradeList();

        List<BootyTrade> GetCurrentTrade(int playerId);
        Boolean AcceptTrade(int sellerplayerId, int buyerplayerId, int id);
        BootyTrade DeleteTrade(int sellerplayerId,int tradeqty, int id);
        BootyTrade GetTradeBooty(int sellerplayerId, int tradeqty, int id);
    }
}
