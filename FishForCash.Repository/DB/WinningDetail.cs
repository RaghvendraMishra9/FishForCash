using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FishForCash.Repository.DB
{
   public class WinningDetail
    {
        [Key]
        [Column(Order = 0)]
        public int WinningDetailId { get; set; }
        [Column(Order = 1)]
        public int? PLayerId { get; set; }
        [ForeignKey("PLayerId")]
        public virtual Player Player { get; set; }
        [Column(Order = 2)]
        public int? PrizeId { get; set; }
        [ForeignKey("PrizeId")]
        public virtual Prize Prize { get; set; }
        [Column(Order = 3)]
        public string GameCodeNo { get; set; }
        [Column(Order = 4)]
        public string ProductType { get; set; }
        [Column(Order = 5)]
        public string FreePlay { get; set; }
        [Column(Order = 6)]
        public bool Rewarded { get; set; }
        [Column(Order = 7)]
        public DateTime DateWon { get; set; }
        public string RewardIcon { get; set; }
        public int? RecordSourceId { get; set; }
        [ForeignKey("RecordSourceId")]
        public virtual RecordSource RecordSource { get; set; }
    }
}
