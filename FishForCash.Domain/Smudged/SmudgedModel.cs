using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FishForCash.Domain.Smudged
{
    public class SmudgedModel
    {

        public int SumdgedId { get; set; }
        [Required(ErrorMessage = "Please enter the gamecode.")]
        public string SmudgedCode { get; set; }
        public string NewCode { get; set; }
        public string Name { get; set; }
        public bool Actioned { get; set; }
        public string Email { get; set; }
        public DateTime SmudgedDate { get; set; }
        [Required(ErrorMessage = "Please enter the expiry date on the roll.")]
        public string ExpiryDate { get; set; }
        [Required(ErrorMessage = "Please enter the product name.")]
        public string ProductName { get; set; }
        public int? PLayerId { get; set; }

    }
}
