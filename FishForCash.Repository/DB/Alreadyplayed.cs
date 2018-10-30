using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FishForCash.Repository.DB
{
   public class Alreadyplayed
    {
        [Key]
        public int AlreadyplayedId { get; set; }
        public int? PLayerId { get; set; }
        [ForeignKey("PLayerId")]
        public virtual Player Player { get; set; }
        public string GameCode { get; set; }
        public string Result { get; set; }
        public DateTime PlayedDate { get; set; }
        public string FullName { get; set; }
        public string PlayerEmail { get; set; }
        public string CurrentPlayerEmail { get; set; }
        public string CureentPlayerName { get; set; }
        public int? CureentPlayerId { get; set; }
        public int? Status { get; set; }
    }
}
