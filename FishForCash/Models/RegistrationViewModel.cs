
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace FishForCash.Web.Models
{
    public class RegistrationViewModel
    {
       
        [Display(Name = "First Name")]
        [Required(ErrorMessage = "First name is required.")]
        public string FirstName { get; set; }
        [Display(Name = "Last Name")]
        [Required(ErrorMessage = "Last name is required.")]
        public string LastName { get; set; }
        [Display(Name = "Screen Name")]
        [Required(ErrorMessage = "Screen name is required.")]
        [Remote("IsScreenNameAlreadyExist", "Account", ErrorMessage = "Screen Name already used! Please choose another.")]
        public string ScreenName { get; set; }

        [Display(Name = "Email",Prompt = "example@example.org")]   
        [Required(ErrorMessage = "Email address is required.")]
        [RegularExpression(@"^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$",
        ErrorMessage = "Please enter valid email address.")]

        [Remote("IsMailAlreadyExist","Account", ErrorMessage = "Email address already registered.")]
        public string EmailId { get; set; }
        [Required(ErrorMessage = "Password is required.")]
        [DataType(DataType.Password)]
        public string Password { get; set; }
        [Display(Name = "Phone")]
        [Required(ErrorMessage = "Phone number is required.")]
        [DataType(DataType.PhoneNumber)]
        public string PhoneNo { get; set; }
        [Required(ErrorMessage = "Occupation is required.")]
        public string Occupation { get; set; }
        [Display(Name = "Age group")]
        [Required(ErrorMessage = "Select age group.")]
        public int AgeGroup { get; set; }
        [Display(Name = "Country")]
        [Required(ErrorMessage = "Select country.")]
        public int CountryId { get; set; }
        [Display(Name = "Region")]
        [Required(ErrorMessage = "Select state.")]
        public int StateId { get; set; }
        public string City { get; set; }
        
        [Display(Name = "Street")]
        public string Address1 { get; set; }
        [Display(Name = "Suburb")]
        public string Address2 { get; set; }
        [Display(Name ="Get Updates via email")]
        public bool GetUpdateByEmail { get; set; }
        [Display(Name = "Terms and conditions")]
        public bool TermsAccepted { get; set; }
        public bool WatchGamePlay { get; set; }
        public DateTime CreatedDate { get; set; }
        public DateTime ModifiedDate { get; set; }
        public bool Active { get; set; }
        public int RoleId { get; set; }

    }
}
