using ExpressMapper;
using FishForCash.Business.Interfaces;
using FishForCash.Domain.BootyTrade;
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
   public class BootyTradeBusiness : IBootyTradeBusiness
    {
        private readonly BootyTradeRepository bootyTradeRepository;
        public BootyTradeBusiness(IUnitOfWork unit)
        {
            bootyTradeRepository = new BootyTradeRepository(unit);
        }
        public void InsertBootyTrade(BootyTrade model)
        {
            if(model !=null)
            bootyTradeRepository.Insert(model);
        }
        public List<BootyTradeModel> BootyTradeList()
        {
            var BootyTrade = bootyTradeRepository.GetAll().ToList();
            List<BootyTradeModel> model = new List<BootyTradeModel>();
            Mapper.Map(BootyTrade, model);
            return model;
        }
        public List<BootyTrade> GetCurrentTrade(int playerId)
        {
            return bootyTradeRepository.GetAll(x=>x.SellerPlayerId == playerId).OrderByDescending(x => x.BootyTradeId).ToList();
        }
        public Boolean AcceptTrade(int sellerplayerId, int buyerplayerId ,int id) {
            var model = bootyTradeRepository.FindBy(predicate: x => x.SellerPlayerId == sellerplayerId && x.BootyTradeId == id);
          if (model !=null)
            {
                model.BuyerPlayerId = buyerplayerId;
                bootyTradeRepository.Update(model);
                return true;
            }
          else
            return false;
        }
        public BootyTrade GetTradeBooty(int sellerplayerId, int buyerplayerId, int id)
        {
            var model = bootyTradeRepository.FindBy(predicate: x => x.SellerPlayerId == sellerplayerId && x.BootyTradeId == id);          
           return model;
        }
        
        public BootyTrade DeleteTrade(int sellerplayerId,int tradeqty, int id)
        {
            BootyTrade model = bootyTradeRepository.FindBy(predicate: x => x.SellerPlayerId == sellerplayerId && x.BootyTradeId == id);
            if (model != null)
            {              
                bootyTradeRepository.Delete(x => x.SellerPlayerId == sellerplayerId && x.BootyTradeId == id);

            }
            return model;
        }
    }
}
