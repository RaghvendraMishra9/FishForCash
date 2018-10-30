using FishForCash.Repository.DB;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FishForCash.Business.Interfaces
{
   public interface IWinningDetailBusiness
    {
        void InsertWinningDetail(WinningDetail model);
        List<WinningDetail> GetWinningDetail(int playerId); 
        List<WinningDetail> GetWinningDetailAllPlayer(); 

        bool CheckGameCode(string gamecode,int playerid);
        void UpdateReward(string gamecode, int playerId,string icon);
    }
}
