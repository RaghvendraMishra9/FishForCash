using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using ExpressMapper;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Identity;
using Microsoft.Extensions.Logging;
using FishForCash.Repository.DB;
using System.Security.Claims;
using FishForCash.Repository;
using Microsoft.AspNetCore.Authorization;
using Microsoft.Extensions.Configuration;
using Microsoft.AspNetCore.Http.Extensions;
using FishForCash.Web.Models;
using FishForCash.Domain.User;
using FishForCash.Business.Interfaces;
using FishForCash.Domain.Player;
using Microsoft.AspNetCore.Mvc.Rendering;
using Microsoft.AspNetCore.Authentication.Cookies;
using Microsoft.AspNetCore.Authentication;
using OnlineRibbonCore.Helpers;
using FishForCash.Web.Helpers;
using OnlineRibbonCore.Controllers;
using System.Text;
using System.Text.RegularExpressions;
using FishForCash.Utility.Enums;
using FishForCash.Domain.Transaction;
using FishForCash.Domain;
using Microsoft.AspNetCore.Http;
using FishForCash.Domain.AlreadyPlayed;
using FishForCash.Domain.Smudged;
using FishForCash.Domain.PrizeRedeemModel;

namespace FishForCash.Web.Controllers
{
    [Authorize(Roles = "Admin")]
    public class AdminController : Controller
    {
        private readonly IPlayerBusiness iplayerBusiness;
        private readonly ICountryBusiness icountryBusiness;
        private readonly IWebCodesBusiness iwebCodesBusiness;
        private readonly ITransactionBusiness itransactionBusiness;
        private readonly IWinningDetailBusiness iwinningDetailBusiness;
        private readonly IPrizeBusiness iprizeBusiness;
        private readonly IAlreadyPlayedBusiness ialreadyPlayedBusiness;
        private readonly ISmudgedBusiness ismudgedBusiness;
        private readonly IBootyBusiness ibootyBusiness;
        private readonly IPrizeReddemBusiness iprizeReddemBusiness;
        private readonly ITreasureChestBusiness itreasureChestBusiness;
        public AdminController(IPlayerBusiness iplayerBusiness, ICountryBusiness icountryBusiness, IWebCodesBusiness iwebCodesBusiness, ITransactionBusiness itransactionBusiness,
            IWinningDetailBusiness iwinningDetailBusiness, IPrizeBusiness iprizeBusiness, IAlreadyPlayedBusiness ialreadyPlayedBusiness, ISmudgedBusiness ismudgedBusiness, IBootyBusiness ibootyBusiness, IPrizeReddemBusiness iprizeReddemBusiness, ITreasureChestBusiness itreasureChestBusiness)
        {
            this.iplayerBusiness = iplayerBusiness;
            this.icountryBusiness = icountryBusiness;
            this.iwebCodesBusiness = iwebCodesBusiness;
            this.itransactionBusiness = itransactionBusiness;
            this.iwinningDetailBusiness = iwinningDetailBusiness;
            this.iprizeBusiness = iprizeBusiness;
            this.ialreadyPlayedBusiness = ialreadyPlayedBusiness;
            this.ismudgedBusiness = ismudgedBusiness;
            this.ibootyBusiness = ibootyBusiness;
            this.iprizeReddemBusiness = iprizeReddemBusiness;
            this.itreasureChestBusiness = itreasureChestBusiness;
        }
        [AllowAnonymous]
        public IActionResult Login()
        {
            return View();
        }
        [HttpPost]
        [AllowAnonymous]
        public async Task<IActionResult> Login(AdminLoginViewModel model)
        {
            try
            {
                if (ModelState.IsValid)
                {
                    var plainText = EncHelper.Encryptdata(model.Password);
                    if (!iplayerBusiness.IsValidPlayer(model.EmailId, plainText))
                    {
                        return RedirectToAction("Login", "Admin");
                    }
                    Player playerdb = iplayerBusiness.GetPlayerByEmail(model.EmailId);
                    if (playerdb.Role.RoleName != "Admin")
                    {
                        return RedirectToAction("Login", "Admin");
                    }
                    var identity = new ClaimsIdentity(CookieAuthenticationDefaults.AuthenticationScheme, ClaimTypes.Name, ClaimTypes.Role);
                    identity.AddClaim(new Claim(ClaimTypes.NameIdentifier, playerdb.ScreenName));
                    identity.AddClaim(new Claim(ClaimTypes.Name, playerdb.ScreenName));
                    identity.AddClaim(new Claim("PlayerId", playerdb.PLayerId.ToString()));
                    identity.AddClaim(new Claim(ClaimTypes.Role, playerdb.Role.RoleName));
                    var principal = new ClaimsPrincipal(identity);
                    // await HttpContext.SignInAsync(CookieAuthenticationDefaults.AuthenticationScheme, principal, new AuthenticationProperties { IsPersistent = model.RememberMe });
                    await HttpContext.SignInAsync(
                    scheme: "FiverSecurityScheme",
                    principal: principal,
                    properties: new AuthenticationProperties
                    {
                        ExpiresUtc = DateTime.UtcNow.AddMinutes(30)
                    });
                    //Send Email
                    string subject = "Login";
                    string body = "<p>Hello Sir/Mam,</p><b> Admin Login Succesfull</b><br/>";
                    if (playerdb.IsLogin == false || playerdb.IsLogin == null)
                    {

                        EmailHelper.SendEmail(model.EmailId, body, subject);
                        playerdb.IsLogin = true;
                        playerdb.TodayDate = DateTime.Now.Date;
                        iplayerBusiness.UpdatePlayer(playerdb);
                    }

                    return RedirectToAction("Index", "Admin");


                }

                return RedirectToAction("Login", "Admin");
            }
            catch (Exception ex)
            {
                return Error();

            }
        }

        public IActionResult Index()
        {
            HttpContext.Session.SetInt32("playerId", 0);
            List<PlayerModel> playerList = iplayerBusiness.GetLastPlayer().Where(x => x.RoleId != 1).Take(50).ToList();
            List<Prize> prizelist = iprizeBusiness.GetPrizeList();
            ViewBag.PrizeList = prizelist.OrderByDescending(x => x.PrizeType).ToList();
            //count balance

            ViewBag.CashPrizeCount = (from prize in prizelist
                                      where prize.PrizeType != null
                                      group prize by prize.PrizeType into prizegroup
                                      select new BalanceViewModel
                                      {
                                          PrizeType = prizegroup.Key,
                                          BalanceCount = string.Format("{0:c}", prizegroup.Where(x => x.PrizeType == prizegroup.Key).Sum(p => p.NumberAwarded * p.AmountAwarded))
                                      }).ToList();
            ViewBag.SmudgedCount = ismudgedBusiness.SmudgedCodeList().Where(x => !x.Actioned).Count();
            ViewBag.AlreadyPlayedCount = ialreadyPlayedBusiness.GetAlreadyplayeds().Where(x => x.Status != Convert.ToInt32(ReplacementStatus.Processed)).Count();
            return View(playerList);

        }
        [HttpPost]
        public IActionResult SearchPlayer(string data)
        {
            var isNumeric = int.TryParse(data, out int n);
            List<Player> model = iplayerBusiness.GetPlayerByData(data, isNumeric);

            List<PlayerModel> playermodel = new List<PlayerModel>();
            Mapper.Map(model, playermodel);
            ViewBag.SearchData = data;
            return View(playermodel);

        }


        public IActionResult PlayerDashboard(int playerId)
        {
            if (iplayerBusiness.GetPlayerById(playerId) == null)
            {
                return NotFound();
            }
            HttpContext.Session.SetInt32("playerId", playerId);
            var countryList = icountryBusiness.GetCountries();
            ViewBag.CountryId = new SelectList(countryList, "CountryId", "CountryName");
            PlayerModel model = iplayerBusiness.GetPlayer(playerId);
            List<WebCode> webcodelist = iwebCodesBusiness.GetWebsCodeByPlayer(playerId).Where(x => !x.GameCodePlayed).ToList();
            model.CompGameCodesCount = webcodelist.Where(x => x.RecordSourceId == Convert.ToInt32(RecordSourceEnum.Complimentary)).Count();
            model.ReplacedGameCodesCount = webcodelist.Where(x => x.RecordSourceId == Convert.ToInt32(RecordSourceEnum.Replacement)).Count();
            model.NotUsedGameCodes = webcodelist.Count();
            if (model.PlayerImage != null)
            {

                string imreBase64Data = Convert.ToBase64String(model.PlayerImage);
                string imgDataURL = string.Format("data:image/png;base64,{0}", imreBase64Data); ;
                ViewBag.PlayerImage = imgDataURL;
            }

            if (TempData["Message"] != null)
            {
                ViewBag.SuccessMsg = TempData["Message"].ToString();
            }
            List<Transaction> transactionList = itransactionBusiness.GetTransactionList(playerId).ToList();
            if (transactionList.Count > 0)
            {
                model.NoOftimesWon = transactionList.Count;
                model.TransactionModelList = transactionList.Take(5).ToList()
                    .Select(x => new TransactionModel
                    {
                        TransactionDatestr = String.Format("{0:dd MMM yyyy HH:mm:ss}", x.TransactionDate),
                        TransactionType = x.TransactionType,
                        Description = x.Description,
                        TransactionValue = string.Format("{0:c}", x.AmountAwarded)
                    }).ToList();
            }
            List<WinningDetail> winningDetailList = iwinningDetailBusiness.GetWinningDetail(playerId);
            List<Prize> prizes = iprizeBusiness.GetPrizeList();
            if (transactionList.Count > 0)
            {
                model.WinningDetailList = winningDetailList
                                 .Select(x => new WinningDetailModel
                                 {
                                     GameCodeNo = x.GameCodeNo,
                                     DateWonstr = String.Format("{0:dd MMM yyyy}", x.DateWon),
                                     Result = x.Prize.PrizeName,
                                     ProductType = x.Prize.PrizeType,
                                     RecordSourceId = x.RecordSourceId
                                 }).ToList();
            }

            List<PrizeRedeem> prizeRedeems = new List<PrizeRedeem>();
            List<CashPrizePayout> cashPrizePayouts = (from list in prizeRedeems
                                                      where list.Processed
                                                      group list by list.RedeemedProduct into prgroup
                                                      orderby prgroup.Key
                                                      select new CashPrizePayout
                                                      {
                                                          PrizeType = prgroup.Key ? "Prize Payouts" : "Cash Payouts",
                                                          BalanceCount = string.Format("{0:c}", prgroup.Sum(p => p.PrizeValue))
                                                      }).ToList();

            model.cashPrizePayouts = cashPrizePayouts;
            ViewBag.PrizePayout = cashPrizePayouts.Where(x => x.PrizeType == "Prize Payouts").Select(x => x.BalanceCount).FirstOrDefault();
            ViewBag.CashPayout = cashPrizePayouts.Where(x => x.PrizeType == "Cash Payouts").Select(x => x.BalanceCount).FirstOrDefault();

            model.treasureChest = itreasureChestBusiness.GetByPlayer(playerId);
            model.Treasurechestsum = itreasureChestBusiness.TreasureChestCount(playerId);
            ViewBag.CashAmount = model.CashBalance != null ? string.Format("{0:c}", model.CashBalance) : "$0.00";
            ViewBag.PrizeAmount = model.PrizeBalance != null ? string.Format("{0:c}", model.PrizeBalance) : "$0.00";
            ViewBag.SmudgedCount = ismudgedBusiness.SmudgedCodeList().Where(x => !x.Actioned && x.PLayerId == playerId).Count();
            ViewBag.AlreadyPlayedCount = ialreadyPlayedBusiness.GetAlreadyplayeds().Where(x => x.CureentPlayerId == playerId && x.Status != Convert.ToInt32(ReplacementStatus.Processed)).Count();

            //Bind Booty Count

            return View(model);
        }
        public IActionResult ClearChest(int id)
        {
            itreasureChestBusiness.ClearTreasure(id);
            return RedirectToAction("PlayerDashboard", "Admin", new { playerId = id });
        }
        [HttpPost]
        public IActionResult UpdatePlayer(PlayerModel model)
        {
            if (ModelState.IsValid)
            {
                Player player = iplayerBusiness.GetPlayerById(model.PLayerId);
                player.ModifiedDate = DateTime.Now;
                player.CountryId = model.CountryId;
                player.StateId = model.StateId;
                player.PhoneNo = model.PhoneNo;
                player.Occupation = model.Occupation;
                player.WatchGamePlay = model.WatchGamePlay;
                player.GetUpdateByEmail = model.GetUpdateByEmail;
                player.AgeGroup = model.AgeGroup;
                player.FirstName = model.FirstName;
                player.LastName = model.LastName;
                player.Address1 = model.Address1;
                player.Address2 = model.Address2;

                Player playerDb = iplayerBusiness.UpdatePlayer(player);

            }

            return RedirectToAction("Index");
        }
        [HttpPost]
        public JsonResult UpdateEmail(string newemail, int id)
        {
            Player playermodel = iplayerBusiness.GetPlayerById(id);
            var isMailIDExist = iplayerBusiness.IsPlayerExist(newemail);
            if (isMailIDExist)
            {
                ViewBag.ErrorMsg = "Player new email address already exist.";
                return Json("error");
            }
            if (playermodel != null)
            {
                var oldemail = playermodel.EmailId;
                playermodel.EmailId = newemail;
                iplayerBusiness.UpdatePlayer(playermodel);
                ViewBag.SuccessMsg = "Player new email address updated successfully.";
            }
            return Json("Ok");
        }

        public IActionResult DeletePlayerPhoto(int PlayerId)
        {
            Player player = iplayerBusiness.GetPlayerById(PlayerId);
            if (player != null)
            {
                player.PlayerImage = null;
                player.ImageName = "";
                Player playerDb = iplayerBusiness.UpdatePlayer(player);

                return RedirectToAction("PlayerDashboard", new { playerId = PlayerId });
            }

            return RedirectToAction("Index");
        }
        public IActionResult DeactivateAccount(int playerId)
        {
            Player player = iplayerBusiness.GetPlayerById(playerId);
            if (player != null)
            {
                player.Active = false;
                Player playerDb = iplayerBusiness.UpdatePlayer(player);
                return Json("Ok");
            }

            return Json("error");
        }
        public IActionResult GetChart()
        {
            return Json("ok");
        }

        //Generate Game Code
        public IActionResult GenerateGameCode(int number)
        {
            List<string> gamecodelist = new List<string>();
            for (int i = 0; i < number; i++)
            {
                int sixdigitprime;
                int fivedigitprime;
                // Six Digit Prime
                do
                {
                    Random generator = new Random();
                    String r = generator.Next(100000, 999999).ToString("D6");
                    var match = Regex.Match(r, @"\d+");
                    sixdigitprime = Convert.ToInt32(match.Value);

                } while (!Check_Prime(sixdigitprime));

                // Five Digit Prime
                do
                {
                    Random generator = new Random();
                    String r = generator.Next(10000, 99999).ToString("D5");
                    var match = Regex.Match(r, @"\d+");
                    fivedigitprime = Convert.ToInt32(match.Value);

                } while (!Check_Prime(fivedigitprime));

                var reveresedDigit = $"{sixdigitprime}" + SwapReverseDigit(fivedigitprime.ToString());
                gamecodelist.Add(reveresedDigit);
            }


            return Json(gamecodelist);
        }
        private string SwapReverseDigit(string fivedigitprime)
        {
            string replacedstring = string.Empty;
            if (fivedigitprime.Length > 1)
            {
                char[] digits = fivedigitprime.ToCharArray();
                char firstDigit = digits[0];
                char thirdDigit = digits[2];

                StringBuilder sb = new StringBuilder(fivedigitprime);
                sb[0] = thirdDigit;
                sb[2] = firstDigit;
                replacedstring = sb.ToString();
            }
            return replacedstring;
        }
        private static bool Check_Prime(int number)
        {
            int i;
            for (i = 2; i <= number - 1; i++)
            {
                if (number % i == 0)
                {
                    return false;
                }
            }
            if (i == number)
            {
                return true;
            }
            return false;
        }

        // Save gamecode

        public IActionResult SaveWebCode(List<string> webcodes, int playerid)
        {
            for (int i = 0; i < webcodes.Count; i++)
            {
                WebCode webcode = new WebCode();
                webcode.GameCode = webcodes[i];
                webcode.PLayerId = playerid;
                webcode.RecordSourceId = (int)RecordSourceEnum.Complimentary;
                webcode.AssignDateIssued = DateTime.Now;
                iwebCodesBusiness.AddWebCode(webcode);
            }
            List<WebCode> webcodelist = iwebCodesBusiness.GetWebsCodeByPlayer(playerid).Where(x => !x.GameCodePlayed).ToList();
            var NotUsedGameCodes = webcodelist.Count();
            var CountComp = webcodelist.Where(x => x.RecordSourceId == Convert.ToInt32(RecordSourceEnum.Complimentary)).Count();
            var response = new { NotPlayedCodeCount = NotUsedGameCodes, CompCount = CountComp };
            return Json(response);
        }
        #region Save GameCode
        public void SaveReplacementWebCode(string gamecode, int playerid, RecordSourceEnum recordSource)
        {
            WebCode webcode = new WebCode();
            webcode.GameCode = gamecode;
            webcode.PLayerId = playerid;
            webcode.RecordSourceId = (int)recordSource;
            webcode.AssignDateIssued = DateTime.Now;
            iwebCodesBusiness.AddWebCode(webcode);
        }
        #endregion

        public IActionResult SendReplacement(int playerId, string forgamecode)
        {
            string gamecode = Common.GenerateGameCode(1);
            SaveReplacementWebCode(gamecode, playerId, RecordSourceEnum.Freeplay);
            ialreadyPlayedBusiness.UpdateStatus(playerId, forgamecode);
            return RedirectToAction("AlreadyplayedCode", "Admin");
        }
        public IActionResult AlreadyplayedCode()
        {
            var id = HttpContext.Session.GetInt32("playerId");
            List<AlreadyplayedModel> model = new List<AlreadyplayedModel>();
            if (id == 0)
            {
                var listmodel = ialreadyPlayedBusiness.GetAlreadyplayeds().Where(x => x.Status != Convert.ToInt32(ReplacementStatus.Processed)).ToList();
                Mapper.Map(listmodel, model);
            }
            else
            {
                var listmodel = ialreadyPlayedBusiness.GetAlreadyplayeds().Where(x => x.CureentPlayerId == id && x.Status != Convert.ToInt32(ReplacementStatus.Processed)).ToList();
                Mapper.Map(listmodel, model);
            }

            return View(model);
        }
        public IActionResult SmudgedCode()
        {
            var id = HttpContext.Session.GetInt32("playerId");
            List<SmudgedModel> model = new List<SmudgedModel>();
            if (id == 0)
            {
                var listmodel = ismudgedBusiness.SmudgedCodeList().Where(x => !x.Actioned).ToList();
                Mapper.Map(listmodel, model);
            }
            else
            {
                var listmodel = ismudgedBusiness.SmudgedCodeList().Where(x => !x.Actioned && x.PLayerId == id).ToList();
                Mapper.Map(listmodel, model);
            }

            return View(model);

        }
        public IActionResult SmudgedReplacement(int playerId, string SmudgedCode)
        {
            string newcode = Common.GenerateGameCode(1);
            SaveReplacementWebCode(newcode, playerId, RecordSourceEnum.Smudged);
            ismudgedBusiness.Update(SmudgedCode, newcode, playerId);
            return RedirectToAction("SmudgedCode", "Admin");
        }
        public IActionResult ProcessVoucher()
        {
            var id = HttpContext.Session.GetInt32("playerId");
            List<PrizeRedeem> reddemProcessList = iprizeReddemBusiness.GetAllRedeem();
            //Bind Unprocessed
            List<PrizeRedeemModel> prizeRedeemmodellistNotProcess = (from x in reddemProcessList
                                                                     where !x.Processed && x.RedeemedProduct
                                                                     select new PrizeRedeemModel
                                                                     {
                                                                         PLayerId = x.PLayerId,
                                                                         PrizeRedeemId = x.PrizeRedeemId,
                                                                         FullName = $"{x.Player.FirstName} {x.Player.LastName}",
                                                                         DateRedeemd = x.DateRedeemd,
                                                                         PrizeValue = x.PrizeValue,
                                                                         Address = $"{x.Player.Address1} {x.Player.Address2} {x.Player.City}",
                                                                         Email = x.Player.EmailId
                                                                     }).ToList();
            List<PrizeRedeemModel> notprocessedmodel = new List<PrizeRedeemModel>();
            if (id == 0)
            {
                ViewBag.notprocessedmodel = prizeRedeemmodellistNotProcess;
            }
            else
            {
                ViewBag.notprocessedmodel = prizeRedeemmodellistNotProcess.Where(x => x.PLayerId == id).ToList();
            }

            //Bind Processed
            List<PrizeRedeemModel> prizeRedeemlistProcess = (from x in reddemProcessList
                                                             where x.Processed && x.RedeemedProduct
                                                             select new PrizeRedeemModel
                                                             {
                                                                 PLayerId = x.PLayerId,
                                                                 PrizeRedeemId = x.PrizeRedeemId,
                                                                 FullName = $"{x.Player.FirstName} {x.Player.LastName}",
                                                                 DatePosted = x.DatePosted,
                                                                 PrizeValue = x.PrizeValue,
                                                                 Address = $"{x.Player.Address1} {x.Player.Address2} {x.Player.City}",
                                                                 Email = x.Player.EmailId
                                                             }).ToList();
            List<PrizeRedeemModel> processedmodel = new List<PrizeRedeemModel>();
            if (id == 0)
            {
                ViewBag.Processedmodel = prizeRedeemlistProcess;
            }
            else
            {
                ViewBag.Processedmodel = prizeRedeemlistProcess.Where(x => x.PLayerId == id).ToList();
            }

            return View();
        }
        public IActionResult PrintVoucher(int voucherId, int Id)
        {
            iprizeReddemBusiness.UpdateRedeem(voucherId, Id, true);

            List<PrizeRedeem> reddemProcessList = iprizeReddemBusiness.GetAllRedeem();
            PrizeRedeemModel prizeRedeemmodellist = (from x in reddemProcessList
                                                     where x.Processed && x.PrizeRedeemId == voucherId
                                                     select new PrizeRedeemModel
                                                     {
                                                         PrizeRedeemId = x.PrizeRedeemId,
                                                         FirstName = $"{x.Player.FirstName}".ToUpper(),
                                                         LastName = $"{x.Player.LastName}".ToUpper(),
                                                         DatePosted = x.DatePosted,
                                                         PrizeValue = x.PrizeValue,
                                                         Address1 = $"{x.Player.Address1}".ToUpper(),
                                                         Address2 = $"{x.Player.Address2}".ToUpper(),
                                                         Email = x.Player.EmailId,
                                                         City = $"{x.Player.City}".ToUpper(),

                                                     }).FirstOrDefault();

            return View(prizeRedeemmodellist);
        }
        public IActionResult ReverseVoucher(int voucherId, int Id)
        {
            iprizeReddemBusiness.UpdateRedeem(voucherId, Id, false);
            return RedirectToAction("ProcessVoucher", "Admin");
        }
        public IActionResult ReverseCheque(int voucherId, int Id)
        {
            iprizeReddemBusiness.UpdateRedeem(voucherId, Id, false);
            return RedirectToAction("ProcessCheque", "Admin");
        }
        public IActionResult ProcessCheque()
        {
            var id = HttpContext.Session.GetInt32("playerId");
            List<PrizeRedeem> reddemProcessList = iprizeReddemBusiness.GetAllRedeem();
            //Bind Unprocessed
            List<PrizeRedeemModel> prizeRedeemmodellistNotProcess = (from x in reddemProcessList
                                                                     where !x.Processed && !x.RedeemedProduct
                                                                     select new PrizeRedeemModel
                                                                     {
                                                                         PLayerId = x.PLayerId,
                                                                         PrizeRedeemId = x.PrizeRedeemId,
                                                                         FullName = $"{x.Player.FirstName} {x.Player.LastName}",
                                                                         DateRedeemd = x.DateRedeemd,
                                                                         PrizeValue = x.PrizeValue,
                                                                         Address = $"{x.Player.Address1} {x.Player.Address2} {x.Player.City}",
                                                                         Email = x.Player.EmailId
                                                                     }).ToList();
            List<PrizeRedeemModel> notprocessedmodel = new List<PrizeRedeemModel>();
            if (id == 0)
            {
                ViewBag.notprocessedmodel = prizeRedeemmodellistNotProcess;
            }
            else
            {
                ViewBag.notprocessedmodel = prizeRedeemmodellistNotProcess.Where(x => x.PLayerId == id).ToList();
            }

            //Bind Processed
            List<PrizeRedeemModel> prizeRedeemlistProcess = (from x in reddemProcessList
                                                             where x.Processed && !x.RedeemedProduct
                                                             select new PrizeRedeemModel
                                                             {
                                                                 PLayerId = x.PLayerId,
                                                                 PrizeRedeemId = x.PrizeRedeemId,
                                                                 FullName = $"{x.Player.FirstName} {x.Player.LastName}",
                                                                 DatePosted = x.DatePosted,
                                                                 PrizeValue = x.PrizeValue,
                                                                 Address = $"{x.Player.Address1} {x.Player.Address2} {x.Player.City}",
                                                                 Email = x.Player.EmailId
                                                             }).ToList();
            List<PrizeRedeemModel> processedmodel = new List<PrizeRedeemModel>();
            if (id == 0)
            {
                ViewBag.Processedmodel = prizeRedeemlistProcess;
            }
            else
            {
                ViewBag.Processedmodel = prizeRedeemlistProcess.Where(x => x.PLayerId == id).ToList();
            }

            return View();
        }
        public IActionResult PrintCheque(int voucherId, int Id)
        {
            iprizeReddemBusiness.UpdateRedeem(voucherId, Id, true);

            List<PrizeRedeem> reddemProcessList = iprizeReddemBusiness.GetAllRedeem();
            PrizeRedeemModel prizeRedeemmodellist = (from x in reddemProcessList
                                                     where x.Processed && x.PrizeRedeemId == voucherId
                                                     select new PrizeRedeemModel
                                                     {
                                                         PrizeRedeemId = x.PrizeRedeemId,
                                                         FirstName = $"{x.Player.FirstName}".ToUpper(),
                                                         LastName = $"{x.Player.LastName}".ToUpper(),
                                                         DatePosted = x.DatePosted,
                                                         PrizeValue = x.PrizeValue,
                                                         Address1 = $"{x.Player.Address1}".ToUpper(),
                                                         Address2 = $"{x.Player.Address2}".ToUpper(),
                                                         Email = x.Player.EmailId,
                                                         City = $"{x.Player.City}".ToUpper(),

                                                     }).FirstOrDefault();

            return View(prizeRedeemmodellist);
        }
        public async Task<IActionResult> Logout()
        {
            //await HttpContext.SignOutAsync(
            //   CookieAuthenticationDefaults.AuthenticationScheme);
            await HttpContext.SignOutAsync();
            HttpContext.Session.Clear();
            return RedirectToAction("Login", "Admin");
        }
        public IActionResult Error()
        {
            return View();
        }
    }
}