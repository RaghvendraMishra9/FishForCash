using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using FishForCash.Business.Interfaces;
using FishForCash.Domain.Player;
using FishForCash.Repository.DB;
using FishForCash.Web.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace FishForCash.Web.Controllers
{
    [Authorize(Roles = "Player")]
    public class ClaimController : Controller
    {
        private readonly IPlayerBusiness iplayerBusiness;
        private readonly ICountryBusiness icountryBusiness;
        private readonly IWebCodesBusiness iwebCodesBusiness;
        private readonly IWinningDetailBusiness iwinningDetailBusiness;
        private readonly ITransactionBusiness itransactionBusiness;
        private readonly IPrizeBusiness iprizeBusiness;
        private readonly IPrizeReddemBusiness  iprizeReddemBusiness;
        public ClaimController(IPlayerBusiness iplayerBusiness, ICountryBusiness icountryBusiness, IWebCodesBusiness iwebCodesBusiness,
            IWinningDetailBusiness iwinningDetailBusiness, ITransactionBusiness itransactionBusiness, IPrizeBusiness iprizeBusiness, IPrizeReddemBusiness iprizeReddemBusiness)
        {
            this.iplayerBusiness = iplayerBusiness;
            this.icountryBusiness = icountryBusiness;
            this.iwebCodesBusiness = iwebCodesBusiness;
            this.iwinningDetailBusiness = iwinningDetailBusiness;
            this.itransactionBusiness = itransactionBusiness;
            this.iprizeBusiness = iprizeBusiness;
            this.iprizeReddemBusiness = iprizeReddemBusiness;
        }
        public IActionResult Index()
        {
            var Id = Convert.ToInt32(User.Claims.ToArray()[2].Value);
            var getwinningdetailList = iwinningDetailBusiness.GetWinningDetail(Id);
            //count balance
            var prizes = iprizeBusiness.GetPrizeList();
            Player model = iplayerBusiness.GetPlayerById(Id);
            

            ViewBag.CashAmount = model.CashBalance != null ? string.Format("{0:c}", model.CashBalance) : "$0.00";
            ViewBag.PrizeAmount = model.PrizeBalance != null ? string.Format("{0:c}", model.PrizeBalance) : "$0.00";
            ViewBag.Cash = model.CashBalance;
            ViewBag.Prize = model.PrizeBalance;


            return View();
        }
        public IActionResult SaveRedeem(double balance ,string type)
        {
            var Id = Convert.ToInt32(User.Claims.ToArray()[2].Value);
            PrizeRedeem prizeRedeem = new PrizeRedeem();
            prizeRedeem.DateRedeemd = DateTime.Now;
            prizeRedeem.PrizeValue = balance;
            prizeRedeem.PLayerId = Id;
            prizeRedeem.RedeemedProduct = type == "Product" ? true : false;
            iprizeReddemBusiness.Insert(prizeRedeem);

            Player model = iplayerBusiness.GetPlayerById(Id);
            if (model != null  )
            {
                if (model.CashBalance != null  && type == "Cash")
                {
                    model.CashBalance = null;
                }
              
            
                if (model.PrizeBalance != null && type == "Product")
                {
                    model.PrizeBalance = model.PrizeBalance - ((int)(model.PrizeBalance / 10))*10;
                }
                iplayerBusiness.UpdatePlayer(model);
            }
          

            return RedirectToAction("Index","Claim");
        }
    }
}