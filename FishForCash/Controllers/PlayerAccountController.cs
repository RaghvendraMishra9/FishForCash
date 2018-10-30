using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Text;
using System.Text.RegularExpressions;
using System.Threading.Tasks;
using ExpressMapper;
using FishForCash.Business.Interfaces;
using FishForCash.Domain;
using FishForCash.Domain.Player;
using FishForCash.Domain.Transaction;
using FishForCash.Domain.WebCode;
using FishForCash.Repository.DB;
using FishForCash.Web.Helpers;
using FishForCash.Web.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Rendering;
using OnlineRibbonCore.Controllers;

namespace FishForCash.Web.Controllers
{
    [Authorize(Roles = "Admin,Player")]
    public class PlayerAccountController : BaseController
    {
        private readonly IPlayerBusiness iplayerBusiness;
        private readonly ICountryBusiness icountryBusiness;
        private readonly IWebCodesBusiness iwebCodesBusiness;
        private readonly IWinningDetailBusiness iwinningDetailBusiness;
        private readonly ITransactionBusiness itransactionBusiness;
        private readonly IPrizeBusiness iprizeBusiness;
        public PlayerAccountController(IPlayerBusiness iplayerBusiness, ICountryBusiness icountryBusiness, IWebCodesBusiness iwebCodesBusiness , IWinningDetailBusiness iwinningDetailBusiness, ITransactionBusiness itransactionBusiness, IPrizeBusiness iprizeBusiness)
        {
            this.iplayerBusiness = iplayerBusiness;
            this.icountryBusiness = icountryBusiness;
            this.iwebCodesBusiness = iwebCodesBusiness;
            this.iwinningDetailBusiness = iwinningDetailBusiness;
            this.itransactionBusiness = itransactionBusiness;
            this.iprizeBusiness = iprizeBusiness;
        }


        public IActionResult Index()
        {  

            var countryList = icountryBusiness.GetCountries();
            ViewBag.CountryId = new SelectList(countryList, "CountryId", "CountryName");

            var Id = Convert.ToInt32(User.Claims.ToArray()[2].Value);
            PlayerModel model = iplayerBusiness.GetPlayer(Id);
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
            if (TempData["ResetPassword"] != null)
            {
                ViewBag.ResetPaswordSuccess = TempData["ResetPassword"].ToString();
            }
            return View(model);

        }

        [HttpPost]
        public async Task<IActionResult> UpdatePlayer(PlayerModel model)
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


                if (model.PlayerFile != null)
                {

                    player.ImageName = $"{model.PlayerFile.Name}";
                    using (var memoryStream = new MemoryStream())
                    {
                        await model.PlayerFile.CopyToAsync(memoryStream);
                        player.PlayerImage = memoryStream.ToArray();
                    }
                }

                Player playerDb = iplayerBusiness.UpdatePlayer(player);
                if (playerDb.PlayerImage != null)
                {
                    HttpContext.Session.Set("ProfileImage", playerDb.PlayerImage);
                }
                if (playerDb != null)
                {
                    TempData["Message"] = " Player profile details updated successfully.";
                }
            }

            return RedirectToAction("Index");
        }

        public IActionResult ResetPlayerPassword(string EmailId)
        {
            try
            {

                if (iplayerBusiness.IsPlayerExist(EmailId))
                {
                    //  Success("Password reset link sent to your email address.", true);
                    var token = Guid.NewGuid();
                    iplayerBusiness.UpdateToken(token, EmailId);
                    Player playerdb = iplayerBusiness.GetPlayerByEmail(EmailId);
                    if (iplayerBusiness.IsPlayerExist(EmailId))
                    {
                        var passwordResetLink = "<a href='" + Url.Action("ResetPassword", "Account", new { email = EmailId, code = token }, "http") + "' class='style4'>Reset My Password</a>";
                        string subject = "PASSWORD RESET";

                        string dynamicContent = @"<td bgcolor='#97cfe7'>
                   <p align='center' class='style3'><br />
                   Hi {FirstName},</ p >
                    <p align = 'center' class='style3'>Please click on the link below to reset your password<br>
                  for your account at www.fishforcash.nz</p>
                 <p align = 'center' class='style3'>{ValidateAccountLink}</p>
                 <p align = 'center' class='style3'><br />
                 If you didn't request this, then please ignore this email.<br />
                <br />
                  The Fish for Cash Team<br />
                 <br />
                 </td>";
                        string body = EmailHelper.ConfigureRegisterMailBody(playerdb.FirstName, "PASSWORD RESET", passwordResetLink, dynamicContent, EmailHelper.GetEmailBody());
                        EmailHelper.SendEmail(EmailId, body, subject);
                    }
                    TempData["ResetPassword"] = "Password reset link sent to email address.";
                    return RedirectToAction("Index");
                }
                else
                {
                    Danger("Looks like something went wrong. Please check your form.", true);
                    return RedirectToAction("Index");
                }
            }
            catch (Exception ex)
            {
                return RedirectToAction("Error", "Account");
            }
        }

        [HttpPost]
        public JsonResult UpdateEmail(string newemail, int id)
        {

            var isMailIDExist = iplayerBusiness.IsPlayerExist(newemail);
            if (isMailIDExist)
            {
                ViewBag.ErrorMsg = "Player new email address already exist.";
                return Json("error");
            }
            Player playermodel = iplayerBusiness.GetPlayerById(id);
            if (playermodel != null)
            {
                var oldemail = playermodel.EmailId;
                playermodel.EmailId = newemail;
                iplayerBusiness.UpdatePlayer(playermodel);

                string subject = "EMAIL ADDRESS UPDATED";
                string dynamicContent = @"<td bgcolor='#97cfe7'>
               <p align='center' class='style3'><br />
Hi Damon,</p>
<p align='center' class='style3'>This is to notify you that the email address <br>
on your account has been updated.</p>
<p align='center' class='style3'>From: " + oldemail + @"<br>
To: " + newemail + @"</p>
<p align='center' class='style3'>If you did not request this change then <br>
please contact support@fishforcash.nz immediately.</p>
<p align='center' class='style3'><a href='mailto:support@fishforcash.nz' class='style4'>This wasn't me. Report this change </a></p>
<p align='center' class='style3'>Cheers,<br />
<br />
The Fish for Cash Team<br />
<br />
</p>
            </td>";
                string body = EmailHelper.ConfigureRegisterMailBody(playermodel.FirstName, "EMAIL ADDRESS UPDATED", "", dynamicContent, EmailHelper.GetEmailBody());
                EmailHelper.SendEmail(oldemail, body, subject);
                EmailHelper.SendEmail(newemail, body, subject);

                ViewBag.SuccessMsg = "Player new email address updated successfully.";
            }
            return Json("Ok");
        }

        public JsonResult SavePlayerimage(string playerphoto, int id)
        {
            Player model = iplayerBusiness.GetPlayerById(id);
            if (model != null && !string.IsNullOrEmpty(playerphoto))
            {
                byte[] playerphotobyte = Convert.FromBase64String(playerphoto.Replace("data:image/png;base64,", ""));
                model.PlayerImage = playerphotobyte;
                iplayerBusiness.UpdatePlayer(model);
                return Json("Ok");
            }
            return Json("error");
        }


        public IActionResult DashBoard()
        {
            var Id = Convert.ToInt32(User.Claims.ToArray()[2].Value);
            PlayerModel model = iplayerBusiness.GetPlayer(Id);
            List<Prize> prizelist = iprizeBusiness.GetPrizeList();
            //Get Not Used Game Codes Count
            List<WebCode> webcodelist = iwebCodesBusiness.GetWebsCodeByPlayer(Id).Where(x => !x.GameCodePlayed).ToList();
            model.NotUsedGameCodes = webcodelist.Count();
            if (model.PlayerImage != null)
            {

                string imreBase64Data = Convert.ToBase64String(model.PlayerImage);
                string imgDataURL = string.Format("data:image/png;base64,{0}", imreBase64Data); 
                ViewBag.PlayerImage = imgDataURL;
            }

           //Recent Plays
            var getwinningdetailList = iwinningDetailBusiness.GetWinningDetail(Id);
            List<WinningDetail> winningDetailList = getwinningdetailList.Take(5).ToList();
            if (winningDetailList.Count > 0)
            {
                var lastPlayedDate = winningDetailList.FirstOrDefault().DateWon;
                var todayDate = DateTime.Now.Date;
                if (lastPlayedDate.Date == todayDate)
                {
                    model.LastDatePlayedDiff = "earlier today";
                }
                else if(lastPlayedDate.Date == DateTime.Today.Date.AddDays(-1))
                {
                    model.LastDatePlayedDiff = "yesterday";
                }
                else
                {
                    model.LastDatePlayedDiff = $"{(lastPlayedDate == null ? 0 : (DateTime.Now.Date - lastPlayedDate.Date).TotalDays)} days ago";
                }
              
                model.WinningDetailList = winningDetailList
                                     .Select(x => new WinningDetailModel
                                     {
                                         GameCodeNo = x.GameCodeNo,
                                         DateWonstr = String.Format("{0:d/M/yyyy HH:mm:ss}", x.DateWon),
                                         Result = x.Prize.PrizeName,
                                         RewardIcon =x.RewardIcon

                                     }).ToList();
            }
            //Recent wins
            List<Transaction> transactionList = itransactionBusiness.GetTransactionList(Id).ToList();
            if (transactionList.Count > 0)
            {
                model.NoOftimesWon = transactionList.Count;
                model.TransactionModelList = transactionList.Take(5).ToList()
                    .Select(x => new TransactionModel
                    {
                        TransactionDatestr = String.Format("{0:d/M/yyyy HH:mm:ss}", x.TransactionDate),
                        TransactionType = x.TransactionType,
                        Description = x.Description,
                        TransactionValue = string.Format("{0:c}", x.AmountAwarded)
                    }).ToList();
            }

            //count balance
            var prizes = iprizeBusiness.GetPrizeList();
            //var CashPrizeCount = (from list in getwinningdetailList
            //                           join prize in prizes on list.PrizeId equals prize.PrizeId
            //                           where prize.PrizeType != null
            //                           group prize by prize.PrizeType into prizeGroup
            //                           orderby prizeGroup.Key
            //                           select new BalanceViewModel
            //                           {
            //                               PrizeType = prizeGroup.Key,
            //                               BalanceCount = string.Format("{0:c}", prizes.Where(p => p.PrizeType == prizeGroup.Key).Sum(p => p.NumberAwarded * p.AmountAwarded))
            //                           }).ToList();
            // if(!CashPrizeCount.Any(x=>x.PrizeType == "Cash"))
            // {
            //     CashPrizeCount.Add(new BalanceViewModel { PrizeType="Cash" , BalanceCount ="$0.00"});
            // }
            // if (!CashPrizeCount.Any(x => x.PrizeType == "Product"))
            // {
            //     CashPrizeCount.Add(new BalanceViewModel { PrizeType = "Product", BalanceCount = "$0.00" });
            // }
            // ViewBag.CashPrizeCount = CashPrizeCount.OrderBy(x=>x.PrizeType);

            ViewBag.CashAmount = model.CashBalance != null ? string.Format("{0:c}", model.CashBalance) : "$0.00";
            ViewBag.PrizeAmount = model.PrizeBalance != null ? string.Format("{0:c}", model.PrizeBalance) : "$0.00";
          
            //collect booty count
            ViewBag.NotRewardedBooty = iwinningDetailBusiness.GetWinningDetail(Id).Where(x => !x.Rewarded).Count();
            return View(model);
        }
       public IActionResult FreeGameCodes(int? attemptno, string playedgameCode =null,  string player = null )
        {
            var Id = Convert.ToInt32(User.Claims.ToArray()[2].Value);
           
            //If played by same player
            if (TempData["SamePlayerPlayed"] !=null && TempData["SamePlayerPlayed"].ToString() == "true" && player == "same")
            {
                
                    var playermodel = iplayerBusiness.GetPlayer(Id);
                    WebCode webmodel = iwebCodesBusiness.GetWebcode(playedgameCode, Id);
                    string prizeResult = iwinningDetailBusiness.GetWinningDetail(Id).Select(x => x.Prize.PrizeName).FirstOrDefault();
                    PlayedCodeModel playedCodeModel = new PlayedCodeModel();
                    playedCodeModel.Date = String.Format("{0:dd MMM yyyy}", webmodel.AssignDateIssued);
                    playedCodeModel.FullName = playermodel.FullName;
                    playedCodeModel.Result = prizeResult;
                    playedCodeModel.GameCode = playedgameCode;
                    ViewBag.alreadyplayedList = playedCodeModel;
                
            }
            //If played by Other player create record in Already Played DB table.
            if (playedgameCode != null && player == "other")
            {
                ViewBag.alreadyPlayedCode = playedgameCode;
            }
           
                if (attemptno != null && attemptno == 5)
                {
                    ViewBag.GAmecodenotExist = "ShowErrorAfterFiveAttempt";
                }
                else if (attemptno != null && attemptno == 10)
                {
                    ViewBag.GAmecodenotExist = "ShowErrorAfter10Attempt";
                }
                else if(TempData["GAmecodenotExist"] != null)
                {
                     ViewBag.GameCode = playedgameCode;
                    ViewBag.GAmecodenotExist = TempData["GAmecodenotExist"].ToString();
                }

            
            List<WebCode> webcodelist = iwebCodesBusiness.GetWebsCodeByPlayer(Id).Where(x => !x.GameCodePlayed).ToList();
            ViewBag.NotUsedGameCodes = webcodelist.Count();
            List<WebCodeModel> model = new List<WebCodeModel>();
            Mapper.Map(webcodelist, model);

            return View(model);
        }
        [HttpGet]
       public IActionResult BindLayout()
        {
            var Id = Convert.ToInt32(User.Claims.ToArray()[2].Value);
            List<WebCode> webcodelist = iwebCodesBusiness.GetWebsCodeByPlayer(Id).Where(x => !x.GameCodePlayed).ToList();
           var NotUsedGameCodesCount = webcodelist.Count();

            //collect booty count
            var NotRewardedBooty = iwinningDetailBusiness.GetWinningDetail(Id).Where(x => !x.Rewarded).Count();

            var data = new { NotUsedGameCodes = NotUsedGameCodesCount ,BootyCount = NotRewardedBooty };
            return Json(data);
        }
    }
}