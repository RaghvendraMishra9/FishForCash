using FishForCash.Domain.Smudged;
using FishForCash.Repository.DB;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FishForCash.Business.Interfaces
{
   public interface  ISmudgedBusiness
    {
        void Insert(Smudged model);
        List<Smudged> SmudgedCodeList();
        void Update(string smudgedcode, string newcode, int playerid);
        bool SmudgedCodeExist(string smudgedcode,int playerid);
    }
}
