using FishForCash.Utility.Enums;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FishForCash.Domain
{
  public  class WinningDetailModel
    {
       
        public int WinningDetailId { get; set; }     
        public int? PLayerId { get; set; }
        public int? PrizeId { get; set; }  

        public string GameCodeNo { get; set; }
        public string ProductType { get; set; }
        public string FreePlay { get; set; }
        public bool? Rewarded { get; set; }
        public DateTime DateWon { get; set; }
        public string Date { get { return DateWon !=null ?string.Format("{0:dd MMM yyyy}", DateWon):string.Empty; } }
        public string DateWonstr { get; set; }
        public int? RewardId { get; set; }
        public string Result { get; set; }
        public int? RecordSourceId { get; set; }
        public string RecordSourceTypestr {
            get {
                return RecordSourceId != null? Enum.GetName(typeof(RecordSourceEnum), RecordSourceId) : string.Empty;
            }
        }
        public string RewardIcon { get; set; }

    }
}
