using FishForCash.Repository.DB;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FishForCash.Business.Interfaces
{
    public interface IBootyBusiness
    {
        List<Booty> GetBootyList();
        void UpdateBooty(Booty model);
        Booty GetBooty(string bootyicon);
    }
}
