using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FishForCash.Repository.DB
{
    public class Player
    {

        [Key]
        public int PLayerId { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string ScreenName { get; set; }
        public string EmailId { get; set; }
        public string Password { get; set; }
        public string PhoneNo { get; set; }
        public string Occupation { get; set; }
        public int? AgeGroup { get; set; }
        public int? CountryId { get; set; }
        [ForeignKey("CountryId")]
        public virtual Country Country { get; set; }        
        public int? StateId { get; set; }
        [ForeignKey("StateId")]
        public virtual State State { get; set; }
        public string City { get; set; }
        public string Address1 { get; set; }
        public string Address2 { get; set; }
        public bool GetUpdateByEmail { get; set; }
        public bool TermsAccepted { get; set; }
        public DateTime CreatedDate { get; set; }
        public DateTime ModifiedDate { get; set; }
        public bool Active { get; set; }
        public Nullable<Guid> Token { get; set; }
        public int? NoOfTimesPlayed { get; set; }
        public bool AccountValidated { get; set; }
        public bool WatchGamePlay { get; set; }
        public int? RoleId { get; set; }
        [ForeignKey("RoleId")]
        public virtual Role Role { get; set; }

        public byte[] PlayerImage { get; set; }
        public string ImageName { get; set; }
        public byte[] PetPhoto { get; set; }
        public string PetImageName { get; set; }
        public bool? IsLogin { get; set; }
        public DateTime? TodayDate { get; set; }

        public double? CashBalance { get; set; }
        public double? PrizeBalance { get; set; }
        public virtual ICollection<WebCode> WebCodes { get; set; }
        public virtual ICollection<WinningDetail> WinningDetails { get; set; }
        public virtual ICollection<Transaction> Transactions { get; set; }
        public virtual ICollection<Smudged> Smudgeds { get; set; }
        public virtual ICollection<TreasureChest> TreasureChests { get; set; }
        public virtual ICollection<PrizeRedeem> PrizeRedeems { get; set; }
    }       
}
