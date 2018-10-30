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
    public class SmudgedBusiness : ISmudgedBusiness
    {
        private readonly SmudgedRepository smudgedRepository;
        public SmudgedBusiness(IUnitOfWork unit)
        {
            smudgedRepository = new SmudgedRepository(unit);
        }
        public void Insert(Smudged model)
        {
            smudgedRepository.Insert(model);
        }
        public List<Smudged> SmudgedCodeList()
        {
            var model = smudgedRepository.GetAll().ToList();
            return model;
        }
        public void Update(string smudgedcode,string newcode, int playerid)
        {
            var model = smudgedRepository.FindBy(predicate: u => u.PLayerId == playerid && u.SmudgedCode == smudgedcode);          
            if (model != null)
            {
                model.Actioned = true;
                model.NewCode = newcode;
            }
             smudgedRepository.Update(model);
        }
        public bool SmudgedCodeExist(string smudgedcode, int playerid)
        {
            return smudgedRepository.Exists(u => u.PLayerId == playerid && u.SmudgedCode == smudgedcode && u.Actioned);
        }
    }
}
