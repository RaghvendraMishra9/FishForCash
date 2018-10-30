using FishForCash.Domain.Country;
using FishForCash.Domain.Player;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FishForCash.Domain.State
{
   public class StateModel
    {
        public int StateId { get; set; }
        public string StateName { get; set; }       
        public int CountryId { get; set; }
        public CountryModel Countries { get; set; }
        ICollection<PlayerModel> Players { get; set; }
    }
}
