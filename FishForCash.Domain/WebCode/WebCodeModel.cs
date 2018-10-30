using FishForCash.Utility.Enums;
using FishForCash.Web.Helpers;
using FishForCash.Web;
using System;
using System.Collections.Generic;
using System.Globalization;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FishForCash.Domain.WebCode
{
    public class WebCodeModel
    {
        public int WebCodeId { get; set; }      
        public string GameCode { get; set; }
        public int? PLayerId { get; set; }       
        public DateTime AssignDateIssued { get; set; }
        public int? RecordSourceId { get; set; }      
        public bool GameCodePlayed { get; set; }
        public string RecordSourceStr
        {
            get
            {
                //var val = EnumHelper<AgeGroupEnum>.GetValues((AgeGroupEnum)AgeGroup);

                var val = EnumHelper<RecordSourceEnum>.Parse(RecordSourceId.ToString());
                return EnumHelper<RecordSourceEnum>.GetDisplayValue(val);

            }
        }
        public string Result { get; set; }
      
        public string AssignDateIssuedstr
        {
            get
            {
                return String.Format("{0:dd MMM yyyy}", AssignDateIssued);
            }
        }
        public List<PlayedCodeModel> PlayedCodeModelList { get; set; }

    }
}
