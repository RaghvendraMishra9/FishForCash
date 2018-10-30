using System;
using System.Globalization;

namespace FishForCash.Web.Helpers
{
    public class DateTimeHelper
    {
       
        public const string DisplayDateFormat = "dd MMM yyyy";
        public const string DisplayDateTimeFormat = "MM/dd/yyyy hh:mm tt";
        public static readonly CultureInfo enUS = new CultureInfo("en-US");
        public static string ToDisplayDateString(DateTime? dt)
        {
            if (dt == null)
                return string.Empty;
            return dt.Value.ToString(DisplayDateFormat, enUS);
        }

        public static string ToDisplayDateTimeString(DateTime? dt)
        {
            if (dt == null)
                return string.Empty;
            return dt.Value.ToString(DisplayDateTimeFormat, enUS);
        }

        public static DateTime? ToDateTime(string dateString)
        {
            DateTime dt;
            if (DateTime.TryParse(dateString, enUS, DateTimeStyles.None, out dt))
                return dt;
            return null;
        }

        public static string ConvertToString(DateTime dt, string format)
        {
            return dt.ToString(format);
        }
    }
}