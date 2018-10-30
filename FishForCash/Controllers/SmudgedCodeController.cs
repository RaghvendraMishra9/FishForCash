using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using ExpressMapper;
using FishForCash.Business.Interfaces;
using FishForCash.Domain.Smudged;
using FishForCash.Repository.DB;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace FishForCash.Web.Controllers
{

    [Authorize(Roles = "Player")]
    public class SmudgedCodeController : Controller
    {
        private readonly IPlayerBusiness iplayerBusiness;
        private readonly ISmudgedBusiness ismudgedBusiness;
        public SmudgedCodeController(IPlayerBusiness iplayerBusiness, ISmudgedBusiness ismudgedBusiness)
        {
            this.iplayerBusiness = iplayerBusiness;
            this.ismudgedBusiness = ismudgedBusiness;
        }
        public IActionResult Index()
        {
            return View();
        }
        [HttpPost]
        public IActionResult Index(SmudgedModel model)
        {
            var Id = Convert.ToInt32(User.Claims.ToArray()[2].Value);
            var playermodel = iplayerBusiness.GetPlayer(Id);
            if(ismudgedBusiness.SmudgedCodeExist(model.SmudgedCode, Id))
            {
                ViewBag.Massege = "AlreadyCodeExist";
                return View();
            }
            if (playermodel != null)
            {
                model.Email = playermodel.EmailId;
                model.SmudgedDate = DateTime.Now;
                model.Name = playermodel.FullName;
                model.PLayerId = Id;
                Smudged smudged = new Smudged();
                Mapper.Map(model, smudged);
                ismudgedBusiness.Insert(smudged);
                ViewBag.Massege = "Submit";
            }
            return View();
        }
    }
}