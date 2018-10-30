using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace FishForCash.Domain
{
    public class PlayedCodeModel
    {
        public string GameCode { get; set; }
        public string Date { get; set; }
        public string FullName { get; set; }
        public string Result { get; set; }
    }
}
