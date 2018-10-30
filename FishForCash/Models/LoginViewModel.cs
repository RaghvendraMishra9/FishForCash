using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace FishForCash.Web.Models
{
    public class LoginViewModel
    {
       
        [Display(Name ="Email")]
        [Required(ErrorMessage = "Please enter your email address.")]
        [RegularExpression(@"^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$",
        ErrorMessage = "*")]     
        public string EmailId { get; set; }
      
        [DataType(DataType.Password)]
        [Required(ErrorMessage = "Please enter your password.")]
        public string Password { get; set; }
        [Display(Name = "Remember Me")]
    
        public bool RememberMe { get; set; }
    }
}
