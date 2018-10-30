using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FishForCash.Domain.User
{
    public class UserModel
    {

        public int UserID { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }

        public string FullName { get; set; }
        public string UserName { get; set; }
        public string UserEmail { get; set; }
        public string Password { get; set; }

        public DateTime LastUpdated { get; set; }
        public string UpdatedBy { get; set; }
        public bool Active { get; set; }


    }
}
