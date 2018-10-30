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
    public class PrizeBusiness : IPrizeBusiness
    {
        private readonly PrizeRepository prizeRepository;
        public PrizeBusiness(IUnitOfWork unit)
        {
            prizeRepository = new PrizeRepository(unit);
        }
        public List<Prize> GetPrizeList()
        {
            return prizeRepository.GetAll().ToList(); 
        }
        public void UpdatePrize(Prize prize)
        {
            prizeRepository.Update(prize);
        }
    }
   
}
