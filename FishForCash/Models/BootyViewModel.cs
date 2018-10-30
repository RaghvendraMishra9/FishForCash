using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace FishForCash.Web.Models
{
    public class BootyViewModel
    {
        public int TradeQuantity { get; set; }
        public int BootyId { get; set; }
        public string BootyIcon { get; set; }

        public int TradeForQuantity { get; set; }
        public int ForBootyId { get; set; }
        public string ForBootyIcon { get; set; }
    }
}
