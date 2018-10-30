using FishForCash.Business.Interfaces;
using FishForCash.Repository;
using FishForCash.Repository.DB;
using FishForCash.Repository.Interface;
using FishForCash.Utility.Enums;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FishForCash.Business.Concrete
{
   public class AlreadyplayedBusiness : IAlreadyPlayedBusiness
    {
        
             private readonly AlreadyPlayedRepository alreadyplayedRepository;
        public AlreadyplayedBusiness(IUnitOfWork unit)
        {
            alreadyplayedRepository = new AlreadyPlayedRepository(unit);
        }
        public void Insert(Alreadyplayed model)
        {
            alreadyplayedRepository.Insert(model);
        }
        public List<Alreadyplayed> GetAlreadyplayeds()
        {
            var model= alreadyplayedRepository.GetAll().ToList();
            return model;
        }
        public bool IsAlreadyPlayed(int playerId, string gamecode)
        {
            return alreadyplayedRepository.Exists(x=>x.PLayerId == playerId && x.GameCode == gamecode);
        }
        public void UpdateStatus(int playerId,string gamecode)
        {
            var model= alreadyplayedRepository.FindBy(predicate: u => u.CureentPlayerId == playerId && u.GameCode == gamecode);
            if(model != null)
            {
                model.Status = Convert.ToInt32(ReplacementStatus.Processed);             
                alreadyplayedRepository.Update(model);
            }
           
        }
    }
}
