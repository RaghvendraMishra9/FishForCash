using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace FishForCash.Web.Models
{
    public class IdValueModel
    {
        public int? Id { get; set; }
        public string Value { get; set; }

        public IdValueModel() { }
        public IdValueModel(int id, string text)
        {
            Id = id;
            Value = text;
        }
    }
    public class SelectListModel
    {
        public string Text { get; set; }
        public string Value { get; set; }

        public SelectListModel()
        {

        }

        public SelectListModel(string value, string text)
        {
            Text = text;
            Value = value;
        }
    }

}
