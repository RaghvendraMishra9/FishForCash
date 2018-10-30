using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FishForCash.Repository.DB
{
   public class Prize
    {
        [Key]
        [Column(Order = 0)]
        public int PrizeId { get; set; }
        [Column(Order = 1)]
        public string PrizeName { get; set; }
        [Column(Order = 2)]
        public string PrizeType { get; set; }
        [Column(Order = 3)]
        public double? AmountAwarded { get; set; }
        [Column(Order = 4)]
        public int? NumberAwarded{ get; set; }
        [Column(Order = 5)]
        public int? MaxLimit { get; set; }
        public ICollection<WinningDetail> WinningDetails { get; set; }
    }
}
