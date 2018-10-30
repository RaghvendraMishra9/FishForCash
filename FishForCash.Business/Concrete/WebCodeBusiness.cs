using ExpressMapper;
using ExpressMapper.Extensions;
using FishForCash.Business.Interfaces;
using FishForCash.Domain.Player;
using FishForCash.Domain.User;
using FishForCash.Domain.WebCode;
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
   public class WebCodeBusiness: IWebCodesBusiness
    {
        private readonly WebCodeRepository webcodeRepository;
        public WebCodeBusiness(IUnitOfWork unit)
        {
            webcodeRepository = new WebCodeRepository(unit);
        }
        public List<WebCode> GetWebCodesList()
        {         
            return webcodeRepository.GetAll(includeProperties: "Player").ToList(); 
        }
        public WebCode UpdateWebCode(WebCode model)
        {
            webcodeRepository.Update(model);
            return model;
        }
        public WebCode AddWebCode(WebCode model)
        {          
            webcodeRepository.Insert(model);           
            return model;
        }
        public List<WebCode> GetWebsCodeByPlayer(int playerId)
        {

            return webcodeRepository.GetAll(u => u.PLayerId == playerId).ToList(); 
        }
        public string UpdateGameCodePlay(string gamecode ,int playerId)
        {
            WebCode model = webcodeRepository.SingleOrDefault(x => x.GameCode == gamecode && x.PLayerId == playerId);
            if (model != null)
            {
                model.GameCodePlayed = true;
                UpdateWebCode(model);
                return "GameCode Updated";
            }
            return "GameCode Not Updated";
        }
       public bool GameCodeExist(string gamecode)
        {
            return webcodeRepository.Exists(x => x.GameCode == gamecode);
        }
        public WebCode GetWebcode(string gamecode, int playerId)
            {
            return webcodeRepository.FindBy(predicate: x => x.GameCode == gamecode && x.PLayerId == playerId, includeProperties: "Player");
        }
    }
}
