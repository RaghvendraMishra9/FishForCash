using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Configuration;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Net;
using System.Net.Mail;
using System.Net.Mime;
using System.Threading.Tasks;

namespace FishForCash.Web.Helpers
{
    public static class EmailHelper
    {
        public async static void SendEmail(string tomail, string body, string subject)
        {

            AlternateView avHtml = AlternateView.CreateAlternateViewFromString(body, null, MediaTypeNames.Text.Html);

            string imagePathFooter = new FileInfo(@"wwwroot/img/Email/email-footer.png").ToString();
            LinkedResource imgFooter = new LinkedResource(imagePathFooter, MediaTypeNames.Image.Jpeg);
            imgFooter.ContentId = "Footer";

            string imagePathHeader = new FileInfo(@"wwwroot/img/Email/email-header.png").ToString();
            LinkedResource imgHeader = new LinkedResource(imagePathHeader, MediaTypeNames.Image.Jpeg);
            imgHeader.ContentId = "Header";

            string imageSpacerPath = new FileInfo(@"wwwroot/img/Email/spacer.gif").ToString();
            LinkedResource imageSpacer = new LinkedResource(imageSpacerPath, MediaTypeNames.Image.Jpeg);
            imageSpacer.ContentId = "ImageSpacer";



            avHtml.LinkedResources.Add(imgHeader);
            avHtml.LinkedResources.Add(imgFooter);
            avHtml.LinkedResources.Add(imageSpacer);

            MailMessage mail = new MailMessage();
            mail.AlternateViews.Add(avHtml);
            mail.To.Add(tomail);
            mail.From = new MailAddress(AppSettings.TestMailEmailId);
            mail.IsBodyHtml = true;
            mail.Subject = subject;
            mail.Body = body;
            SmtpClient smtp = new SmtpClient();
            smtp.Host = "smtp.gmail.com";
            smtp.Port = 587;
            smtp.UseDefaultCredentials = false;
            smtp.Credentials = new NetworkCredential(AppSettings.TestMailEmailId, AppSettings.TestMailPassword);
            smtp.EnableSsl = true;
            await smtp.SendMailAsync(mail);

        }
        public static string GetEmailBody()
        {
            //var file = new FileInfo(@"EmailTemplate.html");
            //string buffer;
            //buffer = File.ReadAllText(file.ToString());
            //return buffer;
            return GetHtml();
        }

        public static string ConfigureRegisterMailBody(string firstName, string mailBodyHeading, string activateAccountLink, string dynamicContent, string htmlBody)
        {
            htmlBody = htmlBody.Replace("{DynamicContent}", dynamicContent);
            htmlBody = htmlBody.Replace("{FirstName}", firstName);
            htmlBody = htmlBody.Replace("{MailHeading}", mailBodyHeading);
            htmlBody = htmlBody.Replace("{ValidateAccountLink}", activateAccountLink);
            htmlBody = htmlBody.Replace("{FirstName}", firstName);
            return htmlBody;
        }

        private static string GetHtml()
        {
            return @"<html>
<head>
    <title>Fish for Cash Verification</title>
    <meta http-equiv='Content-Type' content='text/html; charset=utf-8' />
    <style type='text/css'>
        td img {
            display: block;
        }

        .style1 {
            color: #fff;
            font-family: Geneva, Arial, Helvetica, sans-serif;
            font-size: 16px;
            font-weight: bold;
        }

        .style3 {
            color: #333333;
            font-family: Geneva, Arial, Helvetica, sans-serif;
            font-size: 16px;
            font-weight: bold;
        }

        .style4 {
            color: #0066CC;
            background-color: #FFCC00;
            padding: 8px 15px;
            width: 400px;
        }

        .style5 {
            color: #FFFFFF;
            font-size: 11px;
            font-family: Geneva, Arial, Helvetica, sans-serif;
            padding: 10px;
        }
    </style>

</head>
<body style='background-color:#199daa'>
    <table width='700' border='0' align='center' cellpadding='0' cellspacing='0'>
        <tr>
            <td><img src='wwwroot/img/Email/spacer.gif' width='700' height='1' border='0' alt='' /></td>
            <td><img src='wwwroot/img/Email/spacer.gif' width='1' height='1' border='0' alt='' /></td>
        </tr>
        <tr>
            <td><img name='emailheader' src='cid:Header' width='700' height='174' border='0' id='emailheader' alt='' /></td>
            <td><img src='wwwroot/img/Email/spacer.gif' width='1' height='174' border='0' alt='' /></td>
        </tr>
        <tr>
            <td bgcolor='#4b8bb6'>
                <div align='center' class='style1'>
                    <h3 class='style1	'>{MailHeading}</h3>
                </div>
            </td>
            <td><img src='wwwroot/img/Email/spacer.gif' width='1' height='44' border='0' alt='' /></td>
        </tr>
        <tr>
            {DynamicContent}
            <td><img src='wwwroot/img/Email/spacer.gif' width='1' height='241' border='0' alt='' /></td>
        </tr>
        <tr>

            <td>
                <img src='cid:Footer' width='700' height='341' border='0' id='emailfooter' alt='' />
            </td>
            <td><img src='wwwroot/img/Email/spacer.gif' width='1' height='341' border='0' alt='' /></td>
        </tr>
        <tr>
            <td bgcolor='#4b8bb6'>
                <div align='center'>
                    <div class='style5'>Fish for Cash is a promotion of Butch Petfoods Ltd } support@fishforcash.nz</div>
                </div>
            </td>
            <td><img src='wwwroot/img/Email/spacer.gif' width='1' height='25' border='0' alt='' /></td>
        </tr>
    </table>
</body>
</html>";
        }




    }
}
