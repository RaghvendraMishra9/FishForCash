using FishForCash.Repository.DB;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FishForCash.Business.Interfaces
{
   public interface ITreasureChestBusiness
    {
        TreasureChest GetByPlayer(int playerId);
        void UpdateTreasure(string icon, int playerId);
        void UpdateTreasureBooty(string icon, int playerId ,int bootyqty);
        int TreasureChestCount(int playerId);
        void ClearTreasure(int playerId);
        void SwapBooty(string icon, int playerId);
        void UpdateTreasureBootyAdd(string icon, int playerId, int bootyqty);
        List<TreasureChest> TreasureChestList();
    }
}
