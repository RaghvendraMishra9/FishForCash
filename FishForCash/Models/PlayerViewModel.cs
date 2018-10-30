using FishForCash.Business.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace FishForCash.Web.Models
{

    public class PlayerViewModel
    {
        private readonly ICountryBusiness icountryBusiness;
        public PlayerViewModel(ICountryBusiness icountryBusiness)
        {
            this.icountryBusiness = icountryBusiness;
        }
        public int PLayerId { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string ScreenName { get; set; }
        public string EmailId { get; set; }
        public string Password { get; set; }
        public string PhoneNo { get; set; }
        public string Occupation { get; set; }
        public int AgeGroup { get; set; }
        public int CountryId { get; set; }
        public int StateId { get; set; }
        public string City { get; set; }
        public string Address1 { get; set; }
        public string Address2 { get; set; }
        public bool GetUpdateByEmail { get; set; }
        public bool TermsAccepted { get; set; }
        public DateTime CreatedDate { get; set; }
        public DateTime ModifiedDate { get; set; }
        public bool Active { get; set; }
        public Nullable<Guid> Token { get; set; }
        public int NoOfTimesPlayed { get; set; }
        public bool AccountValidated { get; set; }
        public bool WatchGamePlay { get; set; }

        public string CountryName
        {
            get { return icountryBusiness.CountryName(CountryId); }
        }
    }
}
