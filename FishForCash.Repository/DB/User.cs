using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace FishForCash.Repository.DB
{
    public partial class User
    {
        [Key]
        public int UserId { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string UserName { get; set; }
        public string UserEmail { get; set; }
        public string Password { get; set; }
        public DateTime LastUpdated { get; set; }
        public string UpdatedBy { get; set; }
        public bool Active { get; set; }
    }
}
