using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace FishForCash.Web.Models
{
    public class ResetPasswordViewModel
    {
        [Required]
        public string ReturnToken { get; set; }
        [DataType(DataType.Password)]
        [Required]
        [Display(Name = "New Password")]
        public string NewPassword { get; set; }
        [NotMapped] // Does not effect with your database
        [Compare("NewPassword")]
        [Required]
        [DataType(DataType.Password)]
        [Display(Name = "Confirm Password")]
        public string ConfirmPassword { get; set; }
        public string EmailId { get; set; }
    }
}
