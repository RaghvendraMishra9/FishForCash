using FishForCash.Domain.WebCode;
using FishForCash.Repository.DB;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FishForCash.Business.Interfaces
{
   public interface IWebCodesBusiness
    {
        List<WebCode> GetWebCodesList();
        WebCode UpdateWebCode(WebCode model);
        WebCode AddWebCode(WebCode model);
        List<WebCode> GetWebsCodeByPlayer(int PalyerId);
        string UpdateGameCodePlay(string gamecode ,int playerId);
        bool GameCodeExist(string gamecode);

        WebCode GetWebcode(string gamecode, int playerId);

    }
}
