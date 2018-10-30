using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using ExpressMapper;
using FishForCash.Business.Interfaces;
using FishForCash.Domain.Player;
using FishForCash.Repository.DB;
using FishForCash.Web.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace FishForCash.Web.Controllers
{
   
    public class HomeController : Controller
    {
        private readonly IPlayerBusiness iplayerBusiness;
        private readonly ICountryBusiness icountryBusiness;
        private readonly IWebCodesBusiness iwebCodesBusiness;
        public HomeController(IPlayerBusiness iplayerBusiness, ICountryBusiness icountryBusiness, IWebCodesBusiness iwebCodesBusiness)
        {
            this.iplayerBusiness = iplayerBusiness;
            this.icountryBusiness = icountryBusiness;
            this.iwebCodesBusiness = iwebCodesBusiness;
        }
        public IActionResult Index()
        {
           
            return View();
        }
        public IActionResult Error()
        {
            return View();
        }
       
        public IActionResult UpdatePlayer()
        {
            return View();
        }
    }
}