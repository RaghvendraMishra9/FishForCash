using FishForCash.Repository.DB;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FishForCash.Business.Interfaces
{
    public interface IPrizeBusiness
    {
        List<Prize> GetPrizeList();
        void UpdatePrize(Prize prize);
    }
}
