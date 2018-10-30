using Microsoft.Extensions.Configuration;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace FishForCash.Web.Helpers
{
    internal static class AppSettings
    {
        static string _TestMailEmailId;
        static string _TestMailPassword;
        public static string TestMailEmailId
        {
            get
            {
                return _TestMailEmailId;
            }
        }
        public static string TestMailPassword
        {
            get
            {
                return _TestMailPassword;
            }
        }
        public static void Load(IConfiguration configuration)
        {
            _TestMailEmailId = configuration.GetValue<string>("TestMailEmailId");
            _TestMailPassword = configuration.GetValue<string>("TestMailPassword");

        }
    }
}
