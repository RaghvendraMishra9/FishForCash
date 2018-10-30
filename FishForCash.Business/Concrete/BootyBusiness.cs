using FishForCash.Business.Interfaces;
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
   public class BootyBusiness : IBootyBusiness
    {
        private readonly BootyRepository bootyRepository;
        public BootyBusiness(IUnitOfWork unit)
        {
            bootyRepository = new BootyRepository(unit);
        }
        public List<Booty> GetBootyList()
        {
            var model = bootyRepository.GetAll().ToList();
            return model;
        }
        public void UpdateBooty(Booty model)
        {
            bootyRepository.Update(model);
        }
         public Booty GetBooty(string bootyicon)
        {
          var model=  bootyRepository.FindBy(x => x.BootyIcon == bootyicon);
            return model;
        }
    }
}
