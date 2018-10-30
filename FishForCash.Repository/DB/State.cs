using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FishForCash.Repository.DB
{
   public class State
    {
        public State()
        {
            Players = new HashSet<Player>();
        }
        [Key]
        public int StateId { get; set; }
        public string StateName { get; set; }
        public int? CountryId { get; set; }
        [ForeignKey("CountryId")]
        public virtual Country Country { get; set; }
        public virtual ICollection<Player> Players { get; set; }
    }
}
