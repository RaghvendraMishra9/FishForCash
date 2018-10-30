using FishForCash.Domain.Player;
using FishForCash.Domain.State;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FishForCash.Domain.Country
{
   public class CountryModel
    {

        public int CountryId { get; set; }
        public string CountryName { get; set; }
        List<StateModel> States { get; set; }
        List<PlayerModel> Players { get; set; }
    }
}
