using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FishForCash.Utility.Enums
{
  public enum RecordSourceEnum
    {
        [Display(Name ="Free Play")]
        Freeplay =1,
        [Display(Name = "Smudged")]
        Smudged =2,
        [Display(Name = "Lost")]
        Lost =3,
        [Display(Name = "Replacement")]
        Replacement =4,
        [Display(Name = "Complimentary")]
        Complimentary =5
    }
    public enum ReplacementStatus
    {
        [Display(Name = "Processed")]
        Processed =1,
        [Display(Name = "Not Processed")]
        NotProcessed =2
    }
}
