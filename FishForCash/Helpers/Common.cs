using FishForCash.Web.Models;
using Microsoft.AspNetCore.Mvc.Rendering;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Text.RegularExpressions;
using System.Threading.Tasks;

namespace FishForCash.Web.Helpers
{
    public static class Common
    {
        public static SelectList CreateSelectList(IList<IdValueModel> items, string placeholder = "[SELECT]")
        {
            return CreateSelectList(items, null, placeholder);
        }

        public static SelectList CreateSelectList(IList<IdValueModel> items, int? selectedValue, string placeholder = "[SELECT]")
        {
            //if (!string.IsNullOrWhiteSpace(placeholder))
            //    items.Insert(0, new IdValueModel { Id = null, Value = placeholder });
            return new SelectList(items, "Id", "Value", selectedValue);
        }

        #region Generate Gamecode
        public static string GenerateGameCode(int number)
        {
            string reveresedDigit = string.Empty;
            int sixdigitprime;
            int fivedigitprime;
            // Six Digit Prime
            do
            {
                Random generator = new Random();
                String r = generator.Next(100000, 999999).ToString("D6");
                var match = Regex.Match(r, @"\d+");
                sixdigitprime = Convert.ToInt32(match.Value);

            } while (!Check_Prime(sixdigitprime));

            // Five Digit Prime
            do
            {
                Random generator = new Random();
                String r = generator.Next(10000, 99999).ToString("D5");
                var match = Regex.Match(r, @"\d+");
                fivedigitprime = Convert.ToInt32(match.Value);

            } while (!Check_Prime(fivedigitprime));

            reveresedDigit = $"{sixdigitprime}" + SwapReverseDigit(fivedigitprime.ToString());
            return reveresedDigit;
        }
        private static string SwapReverseDigit(string fivedigitprime)
        {
            string replacedstring = string.Empty;
            if (fivedigitprime.Length > 1)
            {
                char[] digits = fivedigitprime.ToCharArray();
                char firstDigit = digits[0];
                char thirdDigit = digits[2];

                StringBuilder sb = new StringBuilder(fivedigitprime);
                sb[0] = thirdDigit;
                sb[2] = firstDigit;
                replacedstring = sb.ToString();
            }
            return replacedstring;
        }
        private static bool Check_Prime(int number)
        {
            int i;
            for (i = 2; i <= number - 1; i++)
            {
                if (number % i == 0)
                {
                    return false;
                }
            }
            if (i == number)
            {
                return true;
            }
            return false;
        }

        #endregion
    }
}
