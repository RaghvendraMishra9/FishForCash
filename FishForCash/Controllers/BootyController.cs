using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using ExpressMapper;
using FishForCash.Business.Interfaces;
using FishForCash.Domain;
using FishForCash.Domain.BootyTrade;
using FishForCash.Domain.Player;
using FishForCash.Repository.DB;
using FishForCash.Web.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using OnlineRibbonCore.Controllers;

namespace FishForCash.Web.Controllers
{
    [Authorize(Roles = "Admin,Player")]
    public class BootyController : BaseController
    {
        private readonly IBootyBusiness ibootyBusiness;
        private readonly IWinningDetailBusiness iwinningDetailBusiness;
        private readonly IPlayerBusiness iplayerBusiness;
        private readonly IBootyTradeBusiness ibootyTradeBusiness;
        private readonly ITreasureChestBusiness itreasureChestBusiness;
      
        public BootyController(IBootyBusiness ibootyBusiness, IWinningDetailBusiness iwinningDetailBusiness, IPlayerBusiness iplayerBusiness, IBootyTradeBusiness ibootyTradeBusiness, ITreasureChestBusiness itreasureChestBusiness)
        {
            this.ibootyBusiness = ibootyBusiness;
            this.iwinningDetailBusiness = iwinningDetailBusiness;
            this.iplayerBusiness = iplayerBusiness;
            this.ibootyTradeBusiness = ibootyTradeBusiness;
            this.itreasureChestBusiness = itreasureChestBusiness;
        }
        public IActionResult Index(int? key, string other, string icon = null,string gamecode =null )
        {
            var Id = Convert.ToInt32(User.Claims.ToArray()[2].Value);
            List<KeyValuePair<int, string>> elements = new List<KeyValuePair<int, string>>();
            if (!string.IsNullOrEmpty(other))
            {
                string[] commasepa = other.Split(",");
                for(int i =0;i<5;i++)
                {
                    var hashsepa = commasepa[i].Split("#");
                    elements.Add(new KeyValuePair<int, string>(Convert.ToInt32(hashsepa[0]), hashsepa[1]));
                }
            }
            if (key != null && gamecode != null)
            {
                ViewBag.BootyNo = key;
                ViewBag.Icon = icon;
                iwinningDetailBusiness.UpdateReward(gamecode, Id, icon);
                Booty booty = ibootyBusiness.GetBooty(icon);
                booty.TotalAwarded = booty.TotalAwarded + 1;
                ibootyBusiness.UpdateBooty(booty);
                ViewBag.RandomBooty = elements;

                //update treasure chest
                itreasureChestBusiness.UpdateTreasure(icon,Id);
            }
            //Recent Plays

            var getwinningdetailList = iwinningDetailBusiness.GetWinningDetail(Id).Where(x=>!x.Rewarded);
            List<WinningDetail> winningDetailList = getwinningdetailList.ToList();
            List<WinningDetailModel> model = new List<WinningDetailModel>();
            if (winningDetailList.Count > 0)
            {
                Mapper.Map(winningDetailList, model);
            }
            ViewBag.NotRewardedBooty = getwinningdetailList.Count();
            return View(model);
        }
        public IActionResult GetBooty(string gamecode)
        {
            List<KeyValuePair<int, string>> elements = new List<KeyValuePair<int, string>>();       
            var bootyList = ibootyBusiness.GetBootyList().Select(x => x.BootyIcon).ToList();
            Random randOutCome = new Random();
            List<string> bootis = new List<string>();
            for (int i = 1; i < 6; i++)
            {
                var RandomResult = bootyList[randOutCome.Next(0, bootyList.Count())];
                elements.Add(new KeyValuePair<int, string>(i, RandomResult));
                bootis.Add(RandomResult);
            }
                 
            ViewBag.RandomBooty = elements;
            ViewBag.Gamecode = gamecode;
            return View();
        }
        public IActionResult TradeBooty()
        {
            var Id = Convert.ToInt32(User.Claims.ToArray()[2].Value);
            List<BootyTrade> currentTradeList = ibootyTradeBusiness.GetCurrentTrade(Id).Take(10).ToList();
            
            var getwinningdetailListCount = (from x in iwinningDetailBusiness.GetWinningDetail(Id)
                                             where x.Rewarded
                                             group x by x.RewardIcon into groupbyicon
                                             select new TradeBootyViewModel
                                             {
                                                 Icon = groupbyicon.Key,
                                                 OfferedBootyCount = groupbyicon.Count(),

                                             }).ToList();

            var newbootyList = (from x in ibootyBusiness.GetBootyList()
                                join y in getwinningdetailListCount
                                on x.BootyIcon equals y.Icon
                                 into a
                                from b in a.DefaultIfEmpty(new TradeBootyViewModel())
                                select new TradeBootyViewModel
                                {
                                    Icon = x.BootyIcon,
                                    TradeQty = b.OfferedBootyCount,
                                    BootyId = x.BootyId
                                }).ToList();
            ViewBag.Booties = itreasureChestBusiness.GetByPlayer(Id);
            ViewBag.Bootylist = newbootyList;
            return View(currentTradeList);
        }
        [HttpPost]
        public IActionResult OfferBooty(string value, int tradeqty)
        {
            BootyViewModel model = new BootyViewModel();
            model.TradeQuantity = tradeqty;
            model.BootyIcon = value;        
            var bootyList = ibootyBusiness.GetBootyList().ToDictionary(x => x.BootyId, x => x.BootyIcon).ToList();
            ViewBag.Bootylist = bootyList;
            return View(model);
        }
        public IActionResult TradeForBooty(BootyViewModel model)
        {
            var Id = Convert.ToInt32(User.Claims.ToArray()[2].Value);
            BootyTrade bootyTrade = new BootyTrade();
            bootyTrade.SellerPlayerId = Id;
            bootyTrade.TradeBooty = model.BootyIcon;
            bootyTrade.TradeQty = model.TradeQuantity;
            bootyTrade.TradeForBooty = model.ForBootyIcon;
            bootyTrade.TradeForQty = model.TradeForQuantity;
            bootyTrade.TradeDate = DateTime.Now;
            ibootyTradeBusiness.InsertBootyTrade(bootyTrade);

            itreasureChestBusiness.UpdateTreasureBooty(bootyTrade.TradeBooty,Id, bootyTrade.TradeQty);
            return RedirectToAction("TradeBooty","Booty");
        }
        public bool CheckByChest(int TradeforQty, string TradeforBooty,int SellerPlayerId,int MyPlayerId,List<TreasureChest> TreasureChestsList)
        {
            if (TradeforBooty.Equals("a"))
            {
                int a = TreasureChestsList.Where(x=>x.PLayerId == MyPlayerId).FirstOrDefault().a;
                return TradeforQty <= a;
            }
            else if (TradeforBooty.Equals("b"))
            {
                int b = TreasureChestsList.Where(x=>x.PLayerId == MyPlayerId).FirstOrDefault().b;
                return TradeforQty <= b;
            }
            else if (TradeforBooty.Equals("c"))
            {
                int c = TreasureChestsList.Where(x=>x.PLayerId == MyPlayerId).FirstOrDefault().c;
                return TradeforQty <= c;
            }
            else if (TradeforBooty.Equals("d"))
            {
                int d = TreasureChestsList.Where(x=>x.PLayerId == MyPlayerId).FirstOrDefault().d;
                return TradeforQty <= d;
            }
            else if (TradeforBooty.Equals("e"))
            {
                int e = TreasureChestsList.Where(x=>x.PLayerId == MyPlayerId).FirstOrDefault().e;
                return TradeforQty <= e;
            }
            else if (TradeforBooty.Equals("f"))
            {
                int f = TreasureChestsList.Where(x=>x.PLayerId == MyPlayerId).FirstOrDefault().f;
                return TradeforQty <= f;
            }
            else if (TradeforBooty.Equals("g"))
            {
                int g = TreasureChestsList.Where(x => x.PLayerId == MyPlayerId).FirstOrDefault().g;
                return TradeforQty <= g;
            }
            else if (TradeforBooty.Equals("h"))
            {
                int h = TreasureChestsList.Where(x => x.PLayerId == MyPlayerId).FirstOrDefault().h;
                return TradeforQty <= h;
            }
            else if (TradeforBooty.Equals("i"))
            {
                int i = TreasureChestsList.Where(x => x.PLayerId == MyPlayerId).FirstOrDefault().i;
                return TradeforQty <= i;
            }
            else if (TradeforBooty.Equals("j"))
            {
                int j = TreasureChestsList.Where(x => x.PLayerId == MyPlayerId).FirstOrDefault().j;
                return TradeforQty <= j;
            }
            else if (TradeforBooty.Equals("k"))
            {
                int k = TreasureChestsList.Where(x => x.PLayerId == MyPlayerId).FirstOrDefault().k;
                return TradeforQty <= k;
            }
            else if (TradeforBooty.Equals("l"))
            {
                int l = TreasureChestsList.Where(x => x.PLayerId == MyPlayerId).FirstOrDefault().l;
                return TradeforQty <= l;
            }
            else if (TradeforBooty.Equals("m"))
            {
                int m = TreasureChestsList.Where(x => x.PLayerId == MyPlayerId).FirstOrDefault().m;
                return TradeforQty <= m;
            }
            else if (TradeforBooty.Equals("n"))
            {
                int n = TreasureChestsList.Where(x => x.PLayerId == MyPlayerId).FirstOrDefault().n;
                return TradeforQty <= n;
            }
            else if (TradeforBooty.Equals("o"))
            {
                int o = TreasureChestsList.Where(x => x.PLayerId == MyPlayerId).FirstOrDefault().o;
                return TradeforQty <= o;
            }
            else if (TradeforBooty.Equals("p"))
            {

                int p = TreasureChestsList.Where(x => x.PLayerId == MyPlayerId).FirstOrDefault().p;
                return TradeforQty <= p;
            }
            else if (TradeforBooty.Equals("q"))
            {
                int q = TreasureChestsList.Where(x => x.PLayerId == MyPlayerId).FirstOrDefault().q;
                return TradeforQty <= q;
            }
            else if (TradeforBooty.Equals("r"))
            {
                int r = TreasureChestsList.Where(x => x.PLayerId == MyPlayerId).FirstOrDefault().r;
                return TradeforQty <= r;
            }
            else return false;
        }
        public IActionResult BootyMarket(string tradebooty)
        {
            var Id = Convert.ToInt32(User.Claims.ToArray()[2].Value);
            TradeBootyViewModel model = new TradeBootyViewModel();
            var bootyTradeList = ibootyTradeBusiness.BootyTradeList();
            model.BootyIconList = ibootyBusiness.GetBootyList().ToDictionary(x => x.BootyId, x => x.BootyIcon).ToList();
             List<TreasureChest> TreasureChestsList = itreasureChestBusiness.TreasureChestList();
            List<BootyTradeModel> MyTradeBooty = (from x in bootyTradeList
                                                  where x.SellerPlayerId == Id && x.BuyerPlayerId == 0
                                                  select new BootyTradeModel
                                                  {
                                                      BootyTradeId = x.BootyTradeId,
                                                      TradeBooty = x.TradeBooty,
                                                      TradeQty = x.TradeQty,
                                                      TradeForBooty = x.TradeForBooty,
                                                      TradeForQty = x.TradeForQty,
                                                      Status = "Mytrade",
                                                      PlayerId = x.SellerPlayerId,                                                    
                                                      SellerPlayerId = x.SellerPlayerId,
                                                      TradeDate = x.TradeDate
                                                  }).ToList();
            List<BootyTradeModel> AcceptTradeBooty = new List<BootyTradeModel>();
            AcceptTradeBooty = (from e in bootyTradeList                              
                                where  e.BuyerPlayerId == 0 && e.SellerPlayerId != Id && CheckByChest(e.TradeForQty, e.TradeForBooty, e.SellerPlayerId, Id, TreasureChestsList)
                                select new BootyTradeModel
                                {
                                    BootyTradeId = e.BootyTradeId,
                                    TradeBooty = e.TradeBooty,
                                    TradeQty = e.TradeQty,
                                    TradeForBooty = e.TradeForBooty,
                                    TradeForQty = e.TradeForQty,
                                    Status = "AcceptTrade",
                                    PlayerId = e.SellerPlayerId,
                                    SellerPlayerId =e.SellerPlayerId,
                                    TradeDate = e.TradeDate
                                }).ToList();

            List<BootyTradeModel> mergetrade = AcceptTradeBooty.Concat(MyTradeBooty).Distinct().ToList();
            List<BootyTradeModel> CannotTradeBooty = new List<BootyTradeModel>();
            CannotTradeBooty = (from e in bootyTradeList
                                where e.BuyerPlayerId == 0 && e.SellerPlayerId != Id && !CheckByChest(e.TradeForQty, e.TradeForBooty, e.SellerPlayerId,Id, TreasureChestsList)
                                select new BootyTradeModel
                                {
                                    BootyTradeId = e.BootyTradeId,
                                    TradeBooty = e.TradeBooty,
                                    TradeQty = e.TradeQty,
                                    TradeForBooty = e.TradeForBooty,
                                    TradeForQty = e.TradeForQty,
                                    Status = "CanNotTrade",
                                    PlayerId = e.SellerPlayerId,
                                    SellerPlayerId = e.SellerPlayerId,
                                    TradeDate = e.TradeDate
                                }).ToList();
            if (tradebooty == null)
            {

                model.AllAvailableTrades = AcceptTradeBooty.Concat(CannotTradeBooty).Concat(MyTradeBooty).Distinct().OrderByDescending(x => x.TradeDate).ToList();
                model.AllAvailableTradesCount = model.AllAvailableTrades.Count();
            }
            else
            {
                model.Icon = tradebooty;
                model.OfferedBooty = AcceptTradeBooty.Concat(CannotTradeBooty).Concat(MyTradeBooty).ToList().Where(x => x.TradeBooty == tradebooty ).ToList();//data.Where(x => x.TradeBooty == tradebooty && x.SellerPlayerId != Id).ToList();
                model.OfferedBootyCount = model.OfferedBooty.Count();
                model.Wantedtradebooty = AcceptTradeBooty.Concat(CannotTradeBooty).Concat(MyTradeBooty).ToList().Where(x => x.TradeForBooty == tradebooty).ToList();
                model.WantedtradebootyCount = model.Wantedtradebooty.Count();

            }
            return View(model);
        }
    
        public IActionResult SwapForBooty()
        {
            var Id = Convert.ToInt32(User.Claims.ToArray()[2].Value);
            //var getwinningdetailListCount = (from x in iwinningDetailBusiness.GetWinningDetail(Id)
            //                            where x.Rewarded
            //                            group x by x.RewardIcon into groupbyicon
            //                            select new TradeBootyViewModel
            //                            {
            //                                Icon = groupbyicon.Key,
            //                                OfferedBootyCount = groupbyicon.Count(),

            //                            }).ToList();
            //ViewBag.IconCountMorethanfour = getwinningdetailListCount.Where(x=>x.OfferedBootyCount > 4).ToList();
            //  ViewBag.IconCountlessthanfive = getwinningdetailListCount.Where(x => x.OfferedBootyCount < 5).ToList();
            TreasureChest treasureChest = new TreasureChest();
            treasureChest = itreasureChestBusiness.GetByPlayer(Id);          
            return View(treasureChest);
        } 
        public IActionResult SwapBooty(string icon)
        {
            var Id = Convert.ToInt32(User.Claims.ToArray()[2].Value);
            itreasureChestBusiness.SwapBooty(icon, Id);
            return RedirectToAction("SwapForBooty","Booty");
        }
        public IActionResult AcceptTrade(int sellerplayerid,int tradebootyid)
        {
            var BuyerplayerID = Convert.ToInt32(User.Claims.ToArray()[2].Value);
            bool isSuccess= ibootyTradeBusiness.AcceptTrade(sellerplayerid, BuyerplayerID, tradebootyid);
            if (isSuccess)
            {
             BootyTrade bootyTrade=  ibootyTradeBusiness.GetTradeBooty(sellerplayerid, BuyerplayerID, tradebootyid);
             itreasureChestBusiness.UpdateTreasureBootyAdd(bootyTrade.TradeBooty, BuyerplayerID, bootyTrade.TradeQty);
            }

            return RedirectToAction("BootyMarket", "Booty");
        }
        public IActionResult DeleteTrade(int sellerplayerid,int tradeqty, int tradebootyid)
        {
            var playerID = Convert.ToInt32(User.Claims.ToArray()[2].Value);
            BootyTrade bootyTrade= ibootyTradeBusiness.DeleteTrade(sellerplayerid, tradeqty, tradebootyid);
            if (bootyTrade != null)
            {
                itreasureChestBusiness.UpdateTreasureBootyAdd(bootyTrade.TradeBooty,sellerplayerid,tradeqty);
            }
            return RedirectToAction("TradeBooty", "Booty");
        }
    }
}