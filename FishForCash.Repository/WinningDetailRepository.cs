using FishForCash.Repository.Concrete;
using FishForCash.Repository.DB;
using FishForCash.Repository.Interface;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FishForCash.Repository
{
    public class WinningDetailRepository : BaseRepository<WinningDetail>
    {
        public WinningDetailRepository(IUnitOfWork unit) : base(unit)
        { }
    }
}
