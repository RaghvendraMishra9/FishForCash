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
    public class PrizeRedeemBusiness : IPrizeReddemBusiness
    {
        private readonly PrizeRedeemRepository prizeRedeemRepository;
        public PrizeRedeemBusiness(IUnitOfWork unit)
        {
            prizeRedeemRepository = new PrizeRedeemRepository(unit);
        }
        public void Insert(PrizeRedeem model)
        {
            prizeRedeemRepository.Insert(model);
        }
        public List<PrizeRedeem> GetAllRedeem()
        {
          List<PrizeRedeem> prizeRedeemlist=  prizeRedeemRepository.GetAll(includeProperties: "Player").ToList();
            return prizeRedeemlist;
        }
        public List<PrizeRedeem> GetPrizeRedeemByID(int playerId)
        {
            List<PrizeRedeem> prizeRedeemlist = prizeRedeemRepository.GetAll(x=>x.PLayerId == playerId).ToList();
            return prizeRedeemlist;
        }
        public PrizeRedeem GetPrizeRedeem(int prizeredeemid,int playerId)
        {
          PrizeRedeem prizeRedeem=  prizeRedeemRepository.FindBy(x =>x.PrizeRedeemId == prizeredeemid && x.PLayerId == playerId);
            return prizeRedeem;
        }
        public void UpdateRedeem(int prizeredeemid, int playerId ,bool processed)
        {
            PrizeRedeem prizeRedeem = GetPrizeRedeem(prizeredeemid,playerId);
            if(prizeRedeem != null){
                prizeRedeem.DatePosted = DateTime.Now;
                prizeRedeem.Processed = processed;
                prizeRedeemRepository.Update(prizeRedeem);
            }
        }
    }
}
