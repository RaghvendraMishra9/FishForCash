using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FishForCash.Repository.DB
{
    public class Booty
    {
        [Key]
        public int BootyId { get; set; }
        public string BootyIcon { get; set; }
        public string BootyName { get; set; }
        public double? BootyValue { get; set; }
        public int? BootyProbability { get; set; }
        public int TotalAwarded { get; set; }
        public int TotalRedeemed { get; set; }
    }
}
