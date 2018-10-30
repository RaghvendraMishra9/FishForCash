using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FishForCash.Repository.DB
{
   public class Country
    {
        public Country()
        {
            Players = new HashSet<Player>();
            States = new HashSet<State>();
        }

        [Key]
        public int CountryId { get; set; }
        public string CountryName { get; set; }


        public virtual ICollection<Player> Players { get; set; }
        public virtual ICollection<State> States { get; set; }
    }
}
