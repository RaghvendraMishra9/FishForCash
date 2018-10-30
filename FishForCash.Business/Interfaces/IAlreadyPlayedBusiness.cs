using FishForCash.Repository.DB;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FishForCash.Business.Interfaces
{
   public interface IAlreadyPlayedBusiness
    {
        void Insert(Alreadyplayed model);
        List<Alreadyplayed> GetAlreadyplayeds();
        bool IsAlreadyPlayed(int playerId, string gamecode);
        void UpdateStatus(int playerId,string gamecode);
    }
}
