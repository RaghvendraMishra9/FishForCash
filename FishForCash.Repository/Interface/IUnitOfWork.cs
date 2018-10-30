using FishForCash.Repository.DB;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FishForCash.Repository.Interface
{
   public interface IUnitOfWork
    {
        ApplicationDbContext DB { get; }
    }
}
