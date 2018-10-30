using FishForCash.Domain.Player;
using FishForCash.Repository.DB;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FishForCash.Business.Interfaces
{
   public interface IPlayerBusiness
    {
        PlayerModel GetPlayer(int userId);
        bool IsValidPlayer(string email, string password);
        int IsAccountValidated(string email, string password);
        List<PlayerModel> GetAllPlayer();
        List<PlayerModel> GetLastPlayer();
        PlayerModel AddNewPlayer(PlayerModel model);
        bool IsPlayerExist(string email);
        bool IsPlayerScreenNameExist(string email);
        Player UpdateToken(Nullable<Guid> token, string emailId);
        Player ActivatePlayer(String emailId);
        Player UpdatePassword(Guid token, String emailId, string Password);
        Player GetPlayerByEmail(string emailId);
        Player GetPlayerById(int playerId);
        List<Player> GetPlayerByData(string data ,bool isNumeric);
        Player UpdatePlayer(Player model);
        List<RegisteredPlayerModel> GetRegisteredPlayer(int numDays);

    }
}
