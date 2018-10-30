using ExpressMapper;
using ExpressMapper.Extensions;
using FishForCash.Business.Interfaces;
using FishForCash.Domain.Player;
using FishForCash.Domain.User;
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
    public class PlayerBusiness : IPlayerBusiness
    {
        private readonly PlayerRepository playerRepository;
        public PlayerBusiness(IUnitOfWork unit)
        {
            playerRepository = new PlayerRepository(unit);
        }
        public PlayerModel AddNewPlayer(PlayerModel model)
        {
            Player player = new Player();
            Mapper.Map(model, player);
            playerRepository.Insert(player);
            Mapper.Map(player, model);
            return model;
        }
        public List<PlayerModel> GetAllPlayer()
        {
            List<Player> players = playerRepository.GetAll(includeProperties: "Country,State").ToList();
            List<PlayerModel> playerModels = new List<PlayerModel>();
            Mapper.Map(players, playerModels);
            return playerModels;
        }
        public List<PlayerModel> GetLastPlayer()
        {
            List<Player> players = playerRepository.GetAll(includeProperties: "Country,State").OrderByDescending(x => x.CreatedDate).ToList();
            List<PlayerModel> playerModels = new List<PlayerModel>();
            Mapper.Map(players, playerModels);
            return playerModels;
        }
        public PlayerModel GetPlayer(int playerId)
        {
            return playerRepository.FindBy(predicate: u => u.PLayerId == playerId, includeProperties: "Country,State").Map<Player, PlayerModel>();
        }
        public Player GetPlayerByEmail(string emailId)
        {
            return playerRepository.FindBy(predicate: u => u.EmailId == emailId, includeProperties: "Role");
        }
        public List<Player> GetPlayerByData(string data ,bool isNumeric)
        {
            if (isNumeric)
            {
                return playerRepository.GetAll(u => u.PLayerId == Convert.ToInt32(data), includeProperties: "Country,State").ToList();
            }
            if (!string.IsNullOrEmpty(data))
            {
                data = data.ToLower();
                return playerRepository.GetAll(u => u.EmailId.ToLower().Contains(data) || u.FirstName.ToLower().Contains(data) || u.LastName.ToLower().Contains(data) || u.ScreenName.ToLower().Contains(data), includeProperties: "Country,State").ToList();
            }
            return playerRepository.GetAll().ToList();
        }
        public Player GetPlayerById(int playerId)
        {
            return playerRepository.FindBy(predicate: u => u.PLayerId == playerId);
        }
        public bool IsValidPlayer(string email, string password)
        {
            return playerRepository.Exists(u => u.EmailId == email && u.Password == password && u.AccountValidated && u.Active);
        }
        public int IsAccountValidated(string email, string password)
        {
            if (!IsPlayerExist(email))
            {
                return 3; //email does not exist
            }
            var playerValidated = playerRepository.Exists(u => u.EmailId == email && u.Password == password);
            if (playerValidated)
            {
                var playerActive = playerRepository.Exists(u => u.EmailId == email && u.Active);
                if (!playerActive)
                    return 5; // player not active
            }
            if (playerValidated)
            {
                var playerAccountValidated = playerRepository.Exists(u => u.EmailId == email && u.AccountValidated);
                if (!playerAccountValidated)
                    return 2; //player not account validated
            }
            else
                return 1;
            return 4;
        }
        public bool IsPlayerExist(string email)
        {
            return playerRepository.Exists(u => u.EmailId == email);
        }
        public bool IsPlayerScreenNameExist(string screenName)
        {
            return playerRepository.Exists(u => u.ScreenName == screenName);
        }

        public Player UpdateToken(Nullable<Guid> token, string emailId)
        {
            Player player = GetPlayerByEmail(emailId);
            player.Token = token;
            playerRepository.Update(player);
            return player;
        }

        public Player UpdatePassword(Guid token, String emailId, string Password)
        {
            var player = playerRepository.SingleOrDefault(u => u.EmailId == emailId && u.Token == token);
            if (player != null)
            {
                player.Token = null;
                player.Password = Password;
                playerRepository.Update(player);
                return player;
            }
            else
            {
                return player;
            }
        }

        public Player ActivatePlayer(String emailId)
        {
            var player = playerRepository.SingleOrDefault(u => u.EmailId == emailId);
            player.AccountValidated = true;
            playerRepository.Update(player);
            return player;
        }
        public Player UpdatePlayer(Player model)
        {
            playerRepository.Update(model);
            return model;
        }

        public List<RegisteredPlayerModel> GetRegisteredPlayer(int numDays)
        {
            return playerRepository.GetRegisteredPlayer(numDays);
        }
    }
}
