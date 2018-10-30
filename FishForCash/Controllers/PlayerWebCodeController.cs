using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Text.RegularExpressions;
using System.Threading.Tasks;
using ExpressMapper;
using FishForCash.Business.Interfaces;
using FishForCash.Domain;
using FishForCash.Domain.WebCode;
using FishForCash.Repository.DB;
using FishForCash.Utility.Enums;
using FishForCash.Web.Helpers;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;

namespace FishForCash.Web.Controllers
{
    [Authorize(Roles = "Admin,Player")]
    public class PlayerWebCodeController : Controller
    {
        private readonly IPlayerBusiness iplayerBusiness;
        private readonly IWebCodesBusiness iwebCodesBusiness;
        private readonly IPrizeBusiness iprizeBusiness;
        private readonly IWinningDetailBusiness iwinningDetailBusiness;
        private readonly ITransactionBusiness itransactionBusiness;
        private readonly IAlreadyPlayedBusiness ialreadyPlayedBusiness;
        public PlayerWebCodeController(IPlayerBusiness iplayerBusiness, IWebCodesBusiness iwebCodesBusiness, IPrizeBusiness iprizeBusiness, IWinningDetailBusiness iwinningDetailBusiness, ITransactionBusiness itransactionBusiness, IAlreadyPlayedBusiness ialreadyPlayedBusiness)
        {
            this.iplayerBusiness = iplayerBusiness;
            this.iwebCodesBusiness = iwebCodesBusiness;
            this.iprizeBusiness = iprizeBusiness;
            this.iwinningDetailBusiness = iwinningDetailBusiness;
            this.itransactionBusiness = itransactionBusiness;
            this.ialreadyPlayedBusiness = ialreadyPlayedBusiness;
        }
        public IActionResult PlayedGameCode(string gamecode)
        {          
            var prizeResult = string.Empty;
            var Id = Convert.ToInt32(User.Claims.ToArray()[2].Value);
            if (!iwebCodesBusiness.GameCodeExist(gamecode))
            {
                int? tempid = HttpContext.Session.GetInt32("attempts");
                if (tempid == null)
                {
                    HttpContext.Session.SetInt32("attempts", 1);

                }
                else
                {
                    tempid = tempid.Value + 1;
                    HttpContext.Session.SetInt32("attempts", tempid.Value);
                }

                    TempData["GAmecodenotExist"] = "Not Exist";
                return RedirectToAction("FreeGameCodes", "PlayerAccount", new { playedgameCode= gamecode, attemptno =tempid});
            }
          
            var playermodel = iplayerBusiness.GetPlayer(Id);

            //If played by same player return date and result of Gamcode
            WebCode webmodel = iwebCodesBusiness.GetWebcode(gamecode, Id);
            if (webmodel != null && webmodel.GameCodePlayed)
            {
                TempData["SamePlayerPlayed"] = "true";
                return RedirectToAction("FreeGameCodes", "PlayerAccount", new { playedgameCode = gamecode ,player ="same"});
            }
            //If played by different player create record in Already Played DB table.
            var otherPlayer = iwebCodesBusiness.GetWebCodesList().Where(x => x.GameCode == gamecode && x.GameCodePlayed).FirstOrDefault();
            if (otherPlayer != null)
            {
                var otherPlayerId = otherPlayer.PLayerId;
                if (otherPlayerId.Value != Id)
                {                  
                    prizeResult = iwinningDetailBusiness.GetWinningDetail(otherPlayerId.Value).Select(x => x.Prize.PrizeName).FirstOrDefault();
                      var playedgameCode = gamecode;
                    //insert into alraedy played table if not alraedy have a entry
                    if (!ialreadyPlayedBusiness.IsAlreadyPlayed(otherPlayerId.Value, gamecode))
                    {
                        Alreadyplayed alreadyplayed = new Alreadyplayed();
                        alreadyplayed.PLayerId = otherPlayerId.Value;
                        alreadyplayed.PlayedDate = otherPlayer.AssignDateIssued;
                        alreadyplayed.Result = prizeResult;
                        alreadyplayed.GameCode = gamecode;
                        alreadyplayed.FullName = otherPlayer.Player.FirstName + "" + otherPlayer.Player.LastName;
                        alreadyplayed.PlayerEmail = otherPlayer.Player.EmailId;
                        alreadyplayed.CurrentPlayerEmail = playermodel.EmailId;
                        alreadyplayed.CureentPlayerId = Id;
                        alreadyplayed.CureentPlayerName = playermodel.FullName;
                        alreadyplayed.Status = Convert.ToInt32(ReplacementStatus.NotProcessed);
                        ialreadyPlayedBusiness.Insert(alreadyplayed);
                    }
                    return RedirectToAction("FreeGameCodes", "PlayerAccount", new { playedgameCode = gamecode, player = "other" });
                }
            }
            //updated webcode table used  and game code played status.
            iwebCodesBusiness.UpdateGameCodePlay(gamecode, Id);

            //Update player table for NoOFTimesPlayed
            Player player = iplayerBusiness.GetPlayerById(Id);
            player.NoOfTimesPlayed = player.NoOfTimesPlayed + 1;
            iplayerBusiness.UpdatePlayer(player);

            List<WebCode> webcodelist = iwebCodesBusiness.GetWebsCodeByPlayer(Id).Where(x => !x.GameCodePlayed).ToList();
            List<WebCodeModel> model = new List<WebCodeModel>();

            ViewBag.WatchGamePlay = webcodelist.Select(x => x.Player.WatchGamePlay).FirstOrDefault();
            ViewBag.NotUsedGameCodes = webcodelist.Count();
          
            Mapper.Map(webcodelist, model);
            ViewBag.PlayingGameCode = gamecode;
            ViewBag.NotRewardedBootyCount = iwinningDetailBusiness.GetWinningDetail(Id).Where(x => !x.Rewarded).Count();
            return View(model);
        }
        public string GetLastResult()
        {
            var playerId = Convert.ToInt32(User.Claims.ToArray()[2].Value);
            var prizeResult = iwinningDetailBusiness.GetWinningDetail(playerId).Select(x => x.Prize.PrizeName).FirstOrDefault();
            return prizeResult;
        }
        #region Random Select Result
        public string RandomSelectResult()
        {
            string result = string.Empty;
            var Id = Convert.ToInt32(User.Claims.ToArray()[2].Value);
            List<WebCode> webcodelist = iwebCodesBusiness.GetWebsCodeByPlayer(Id).Where(x => !x.GameCodePlayed).ToList();
            List<Prize> prize = iprizeBusiness.GetPrizeList();
            // string[] possibleOutComes = { "$50 Cash", "$10 Cash", "$5 Cash", "$5 Products", "Not a Winning Prize", "$2.50 Products", "Free Play" };
            string[] possibleOutComes = prize.Select(x => x.PrizeName).ToArray();
            int?[] MaxLimit = prize.Select(x => x.MaxLimit).ToArray();
            List<string> repeatedOutComeList = new List<string>();

            for (int i = 0; i < 4; i++)
            {
                repeatedOutComeList.Add(possibleOutComes[0]); //$50 Cash
            }
            for (int i = 0; i < 10; i++)
            {
                repeatedOutComeList.Add(possibleOutComes[1]); //$10 Cash
            }
            for (int i = 0; i < 20; i++)
            {
                repeatedOutComeList.Add(possibleOutComes[2]); //$5 Cash
            }
            for (int i = 0; i < 10; i++)
            {
                repeatedOutComeList.Add(possibleOutComes[3]); //$5 Products
            }
            //if (webcodelist.Count() < 10)
            //{
            //    for (int i = 0; i < 700; i++)
            //    {
            //        repeatedOutComeList.Add(possibleOutComes[4]); //Not a Winning Prize
            //    }
            //}
            //else
            //{
            //    for (int i = 0; i < 2000; i++)
            //    {
            //        repeatedOutComeList.Add(possibleOutComes[4]);
            //    }
            //}
            for (int i = 0; i < 10; i++)
            {
                repeatedOutComeList.Add(possibleOutComes[4]); //Not a Winning Prize
            }
            for (int i = 0; i < 20; i++)
            {
                repeatedOutComeList.Add(possibleOutComes[5]); //$2.50 Products
            }
            for (int i = 0; i < 30; i++)
            {
                repeatedOutComeList.Add(possibleOutComes[6]); //Free Play
            }

            Random randOutCome = new Random();
            string RandomResult = repeatedOutComeList[randOutCome.Next(0, repeatedOutComeList.Count)];
            if (RandomResult != possibleOutComes[4])// possibleOutComes[4] == Not a Winning Prize
            {
                var ismaxlimitexceed = prize.Where(x => x.PrizeName == RandomResult && x.MaxLimit <= x.NumberAwarded).Any();
                if (ismaxlimitexceed)
                {
                    // update prize table
                    var prizemodel = prize.Where(x => x.PrizeName == possibleOutComes[4]).FirstOrDefault();
                    prizemodel.NumberAwarded = (prizemodel.NumberAwarded ?? 0) + 1;
                    iprizeBusiness.UpdatePrize(prizemodel);
                    return possibleOutComes[4];
                }
                else
                {
                    // update prize table
                    var prizemodel = prize.Where(x => x.PrizeName == RandomResult).FirstOrDefault();
                    prizemodel.NumberAwarded = (prizemodel.NumberAwarded ?? 0) + 1;
                    iprizeBusiness.UpdatePrize(prizemodel);
                    return RandomResult;

                }
            }
            else
                return RandomResult;



        }
        #endregion

        #region Save Winning Result
        [HttpPost]
        public IActionResult SaveWinningResult(string gamecode, int playerid, string result)
        {

            // check gamecode exist for same playerid
            if (iwinningDetailBusiness.CheckGameCode(gamecode, playerid))
            {
                return Json(null);
            }
            List<Prize> prizelist = iprizeBusiness.GetPrizeList();
            var prize = prizelist.Where(x => x.PrizeName == result).FirstOrDefault();
            WinningDetail model = new WinningDetail();
            model.DateWon = DateTime.Now;
            model.GameCodeNo = gamecode;
            model.PLayerId = playerid;
            model.PrizeId = prize.PrizeId;
            model.RecordSourceId = Convert.ToInt32(RecordSourceEnum.Complimentary);
            if (result == "Free Play")
            {
                model.FreePlay = "Free Play";
                var generatedGameCode = Common.GenerateGameCode(1);
                SaveWebCode(generatedGameCode, playerid);
            }
            //insert in to Winning detail Table
            iwinningDetailBusiness.InsertWinningDetail(model);
            //Insert in to transaction Table
            if (result != "Free Play" && result != "Not a Winning Prize")
            {
                Transaction transactionmodel = new Transaction();
                transactionmodel.GameCode = gamecode;
                transactionmodel.PLayerId = playerid;
                transactionmodel.TransactionDate = model.DateWon;
                transactionmodel.TransactionType = prize.PrizeType;
                transactionmodel.AmountAwarded = prize.AmountAwarded;
                transactionmodel.Description = result;
                InsertTransaction(transactionmodel);
            }
            //Insert into player
           Player player= iplayerBusiness.GetPlayerById(playerid);
            if(player != null){
                if (prize.PrizeType == "Cash")
                    player.CashBalance = player.CashBalance == null ? ( prize.AmountAwarded) : (player.CashBalance + prize.AmountAwarded);
                if (prize.PrizeType == "Product")
                    player.PrizeBalance = player.PrizeBalance == null ? (prize.AmountAwarded) : (player.PrizeBalance + prize.AmountAwarded);

                iplayerBusiness.UpdatePlayer(player);
            }
            ViewBag.NotRewardedBootyCount = iwinningDetailBusiness.GetWinningDetail(playerid).Where(x => !x.Rewarded).Count();
            string LastResult = GetLastResult();
            return Json(LastResult);
        }
        #endregion
        public void InsertTransaction(Transaction transactionmodel)
        {
            itransactionBusiness.InsertTransaction(transactionmodel);
        }


        #region Save GameCode
        public void SaveWebCode(string gamecode, int playerid)
        {
            WebCode webcode = new WebCode();
            webcode.GameCode = gamecode;
            webcode.PLayerId = playerid;
            webcode.RecordSourceId = (int)RecordSourceEnum.Freeplay;
            webcode.AssignDateIssued = DateTime.Now;
            iwebCodesBusiness.AddWebCode(webcode);
        }
        #endregion

       
       
      
    }
}