using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace FishForCash.Web.Models
{
    public class BalanceViewModel
    {
        public string PrizeType { get; set; }
        public string BalanceCount { get; set; } 
        public double? Balance { get; set; }
    }
}
