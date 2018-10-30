using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FishForCash.Repository.DB
{
    public class RecordSource
    {
        [Key]
        public int RecordSourceId { get; set; }
        public string RecordSourceName { get; set; }
        public virtual ICollection<WebCode> WebCodes { get; set; }
        public virtual ICollection<WinningDetail> WinningDetails { get; set; }
    }
}
