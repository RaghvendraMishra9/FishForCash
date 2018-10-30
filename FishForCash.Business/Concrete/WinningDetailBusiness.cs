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
   public class WinningDetailBusiness : IWinningDetailBusiness
    {
        private readonly WinningDetailRepository winningDetailRepository;
        public WinningDetailBusiness(IUnitOfWork unit)
        {
            winningDetailRepository = new WinningDetailRepository(unit);
        }
        public void InsertWinningDetail(WinningDetail model)
        {
            winningDetailRepository.Insert(model);
        }
        public List<WinningDetail> GetWinningDetail(int playerId)
        {

            return winningDetailRepository.GetAll(x => x.PLayerId == playerId, includeProperties: "Prize").OrderByDescending(x => x.DateWon).ToList();
        }
        public List<WinningDetail> GetWinningDetailAllPlayer()
        {

            return winningDetailRepository.GetAll().OrderByDescending(x => x.DateWon).ToList();
        }
        public bool CheckGameCode(string gamecode, int playerid)
        {
            return winningDetailRepository.Exists(x => x.GameCodeNo == gamecode && x.PLayerId == playerid);
        }
        public void UpdateReward(string gamecode, int playerId, string icon)
        {
            var model = winningDetailRepository.SingleOrDefault(x => x.PLayerId == playerId && x.GameCodeNo == gamecode);
            if(model != null)
            {
                model.RewardIcon = icon;
                model.Rewarded = true;
                winningDetailRepository.Update(model);
            }
        }
    }
}
