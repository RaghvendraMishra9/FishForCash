using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FishForCash.Domain.AlreadyPlayed
{
   public class AlreadyplayedModel
    {
       
        public int AlreadyplayedId { get; set; }
        public int? PLayerId { get; set; }            
        public string GameCode { get; set; }
        public string Result { get; set; }
        public DateTime PlayedDate { get; set; }
        public string FullName { get; set; }
        public string PlayerEmail { get; set; }
        public string CurrentPlayerEmail { get; set; }
        public string CureentPlayerName { get; set; }
        public int? CureentPlayerId { get; set; }
        public int? Status { get; set; }
        public string PlayedDatestr { get { return PlayedDate != null ? String.Format("{0:dd MMMM yyyy}", PlayedDate) : string.Empty; } }
    }
}
