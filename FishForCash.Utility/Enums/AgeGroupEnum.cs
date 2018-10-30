
using System;
using System.ComponentModel.DataAnnotations;

namespace FishForCash.Utility.Enums
{
    public enum AgeGroupEnum
    {
        [Display(Name = "No Data")]
        NoData = 0,
        [Display(Name = "1 - 17Years")]
        OneToSeventeen = 1,
        [Display(Name = "18 - 24 Years")]
        EighteentoTwentyFourYears ,
        [Display(Name = "25 - 34 Years")]
        TwentyFivetoThirtyFour,
        [Display(Name = "35 - 49 Years")]
        ThirtyFivetoFourtyNine,
        [Display(Name = "Over 50 Years")]
        OverFiftyYears
    }
}
