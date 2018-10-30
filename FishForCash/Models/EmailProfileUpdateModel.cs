using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace FishForCash.Web.Models
{
    public class EmailProfileUpdateModel
    {
        public int PlayerId { get; set; }
        [Display(Name = "Current Email Address")]
        [Required(ErrorMessage = "*")]
        [RegularExpression(@"^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$",
        ErrorMessage = "Please enter valid email address.")]
        public string CurrentEmailAddress { get; set; }
        [Display(Name = "Old Email Address")]
        [Required(ErrorMessage = "*")]
        [RegularExpression(@"^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$",
        ErrorMessage = "Please enter valid email address.")]
        public string OldEmailAddress { get; set; }
    }
}
