using FishForCash.Business.Concrete;
using FishForCash.Repository.DB;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FishForCash.Business.Interfaces
{
   public interface IPrizeReddemBusiness
    {
        void Insert(PrizeRedeem model);
        List<PrizeRedeem> GetAllRedeem();
        void UpdateRedeem(int prizeredeemid ,int playerId ,bool processed);
        PrizeRedeem GetPrizeRedeem(int prizeredeemid,int playerId);
        List<PrizeRedeem> GetPrizeRedeemByID(int playerId);
    }
}
