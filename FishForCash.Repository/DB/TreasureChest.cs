using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FishForCash.Repository.DB
{
   public class TreasureChest
    {
        [Key]
        public int TreasureChestId { get; set; }    
        public int? PLayerId { get; set; }
        [ForeignKey("PLayerId")]
        public virtual Player Player { get; set; }
        public int a { get; set; } 
        public int b { get; set; }
        public int c { get; set; }
        public int d { get; set; }
        public int e { get; set; }
        public int f { get; set; }
        public int g { get; set; }
        public int h { get; set; }
        public int i { get; set; }
        public int j { get; set; }
        public int k { get; set; }
        public int l { get; set; }
        public int m { get; set; }
        public int n { get; set; }
        public int o { get; set; }
        public int p { get; set; }
        public int q { get; set; }
        public int r { get; set; }


    }
}
