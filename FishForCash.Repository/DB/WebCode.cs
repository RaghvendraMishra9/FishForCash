using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FishForCash.Repository.DB
{
    public class WebCode
    {
        [Key]
        public int WebCodeId { get; set; }
        public string GameCode { get; set; }
        public int? PLayerId { get; set; }
        [ForeignKey("PLayerId")]
        public virtual Player Player { get; set; }
        public DateTime AssignDateIssued { get; set; }
        public int? RecordSourceId { get; set; }
        [ForeignKey("RecordSourceId")]
        public virtual RecordSource RecordSource { get; set; }
        public bool GameCodePlayed { get; set; }
    }
}
