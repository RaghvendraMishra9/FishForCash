using FishForCash.Repository.DB;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using FishForCash.Repository;
using FishForCash.Web.Helpers;
using FishForCash.Utility.Enums;
using Microsoft.AspNetCore.Http;
using FishForCash.Domain.WebCode;
using FishForCash.Domain.Transaction;


namespace FishForCash.Domain.Player
{
    public class PlayerModel
    {
        [Required(ErrorMessage = "First Name is required.")]
        public int PLayerId { get; set; }
        [Display(Name = "First Name")]

        [Required(ErrorMessage = "Last Name is required.")]
        public string FirstName { get; set; }
        [Display(Name = "Last Name")]

        public string LastName { get; set; }
        [Display(Name = "Screen Name")]

        public string ScreenName { get; set; }
        [Display(Name = "Email")]
        public string EmailId { get; set; }
        public string Password { get; set; }
        [Display(Name = "Phone")]
        [Required(ErrorMessage = "Phone is required.")]
        public string PhoneNo { get; set; }
        public string Occupation { get; set; }
        [Display(Name = "Age Group")]
        [Required(ErrorMessage = "Age Group is required.")]
        public int AgeGroup { get; set; }
        [Display(Name = "Country")]
        [Required(ErrorMessage = "Country is required.")]
        public int CountryId { get; set; }
        [Display(Name = "State")]
        [Required(ErrorMessage = "State is required.")]
        public int StateId { get; set; }
        public string City { get; set; }
        [Display(Name = "Street")]
        public string Address1 { get; set; }
        [Display(Name = "Suburb")]
        public string Address2 { get; set; }
        [Display(Name = "Get Update By Email")]
        public bool GetUpdateByEmail { get; set; }
        public bool TermsAccepted { get; set; }
        public DateTime CreatedDate { get; set; }
        public DateTime ModifiedDate { get; set; }
        public bool Active { get; set; }
        public Nullable<Guid> Token { get; set; }
        public int NoOfTimesPlayed { get; set; }
        public bool AccountValidated { get; set; }
        [Display(Name = "Watch Game Play")]
        public bool WatchGamePlay { get; set; }
        public string CountryName { get; set; }
        public string StateName { get; set; }
      
        public string AccountValidatedStr
        {
            get
            {
                return GetUpdateByEmail ? "Validated" : "Not Validated";
            }
        }
        public string WatchGamePlayStr
        {
            get
            {
                return WatchGamePlay ? "Yes" : "No";
            }
        }
        public string GetUpdateByEmailStr
        {
            get
            {
                return GetUpdateByEmail ? "Yes" : "No";
            }
        }
        public string ActiveStr
        {
            get
            {
                return Active ? "Active" : "Not Active";
            }
        }
        public byte[] PlayerImage { get; set; }
        public string ImageName { get; set; }
        public byte[] PetPhoto { get; set; }
        public string PetImageName { get; set; }
        public IFormFile PlayerFile { get; set; }
        public IFormFile PetFile { get; set; }
        public string AgeGroupStr
        {
            get
            {
                //var val = EnumHelper<AgeGroupEnum>.GetValues((AgeGroupEnum)AgeGroup);
               
               var val = EnumHelper<AgeGroupEnum>.Parse(AgeGroup.ToString());
               return EnumHelper<AgeGroupEnum>.GetDisplayValue(val);
                
            }
        }
        public int RoleId { get; set; }
        public String FullName
        {
            get
            {
                return $"{FirstName +" " + LastName}";
            }
        }
        public string CreatedDateStr
        {
            get
            {
                return String.Format("{0:dd MMM yyyy}", CreatedDate);
            }
        }

        public int NotUsedGameCodes { get; set; }
        public List<WinningDetailModel> WinningDetailList { get; set; }
        public List<TransactionModel> TransactionModelList { get; set; }       
        public TreasureChest treasureChest { get; set; }
        public List<CashPrizePayout> cashPrizePayouts { get; set; }
        public int Treasurechestsum { get; set; }
        public int NoOftimesWon { get; set; }
        public string LastDatePlayedDiff { get; set; }
        public int? CompGameCodesCount { get; set; }
        public int? ReplacedGameCodesCount { get; set; }
        public double? CashBalance { get; set; }
        public double? PrizeBalance { get; set; }
        public List<PrizeRedeemModel.PrizeRedeemModel> prizeRedeemModels { get; set; }

    }
    public class CashPrizePayout
    {
        public string PrizeType { get; set; }
        public string BalanceCount { get; set; }
    }
}
