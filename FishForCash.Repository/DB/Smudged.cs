using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FishForCash.Repository.DB
{
   public class Smudged
    {
        [Key]
        public int SumdgedId { get; set; }
        public string SmudgedCode { get; set; }
        public string NewCode { get; set; }
        public string Name { get; set; }
        public bool Actioned { get; set; }
        public string Email { get; set; }
        public DateTime SmudgedDate { get; set; }
        public string ExpiryDate { get; set; }
        public string ProductName { get; set; }
        public int? PLayerId { get; set; }
        [ForeignKey("PLayerId")]
        public virtual Player Player { get; set; }
    }
}
