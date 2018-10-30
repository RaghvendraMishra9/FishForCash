using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using ExpressMapper;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Identity;
using Microsoft.Extensions.Logging;
using FishForCash.Repository.DB;
using System.Security.Claims;
using FishForCash.Repository;
using Microsoft.AspNetCore.Authorization;
using Microsoft.Extensions.Configuration;
using Microsoft.AspNetCore.Http.Extensions;
using FishForCash.Web.Models;
using FishForCash.Domain.User;
using FishForCash.Business.Interfaces;
using FishForCash.Domain.Player;
using Microsoft.AspNetCore.Mvc.Rendering;
using Microsoft.AspNetCore.Authentication.Cookies;
using Microsoft.AspNetCore.Authentication;
using OnlineRibbonCore.Helpers;
using FishForCash.Web.Helpers;
using OnlineRibbonCore.Controllers;
using Microsoft.AspNetCore.Hosting;

namespace FishForCash.Web.Controllers
{
    public class AccountController : BaseController
    {
        private readonly IPlayerBusiness iplayerBusiness;
        private readonly ICountryBusiness icountryBusiness;
      


        public AccountController(IPlayerBusiness iplayerBusiness, ICountryBusiness icountryBusiness)
        {
            this.iplayerBusiness = iplayerBusiness;
            this.icountryBusiness = icountryBusiness;
           
        }
        public IActionResult Login()
        {
            return View();
        }
        [HttpPost]
        public async Task<IActionResult> Login(LoginViewModel model , string returnUrl)
        {
            try
            {
                if (ModelState.IsValid)
                {
                    ViewBag.MailPasswordNotExist = "Exist";
                    ViewBag.MailExist = 0;
                    ViewBag.PlayerNotActive = 0;
                    ViewBag.HomeForgetPassword = "NotReset";
                    ViewBag.PlayerNotExistMsg = "Exist";
                    ViewBag.ResetPasswordMsg = "NotResetPasswordMsg";
                    var plainText = EncHelper.Encryptdata(model.Password);
                    var isValid = iplayerBusiness.IsValidPlayer(model.EmailId, plainText);
                    Player playerdb = iplayerBusiness.GetPlayerByEmail(model.EmailId);
                    if (!isValid)
                    {

                        var valid = iplayerBusiness.IsAccountValidated(model.EmailId.ToLower(), plainText);
                        if (valid == 3)
                        {
                            ModelState.AddModelError("", "Email does not exist.");
                            ViewBag.MailExist = 3;
                            return View("ForgotPassword");
                        }
                        if (valid == 5)
                        {
                            ModelState.AddModelError("", "Player mail doen not exist");
                            ViewBag.PlayerNotActive = 5;
                            return View("ForgotPassword");
                        }
                        if (valid == 2)
                        {
                            ModelState.AddModelError("", "Player not validated.");
                            ViewBag.PlayerNotValidated = 2;
                            return View("ForgotPassword");
                        }


                        if (valid == 1)
                        {
                            ModelState.AddModelError("", "Player not exist.");
                            ViewBag.MailPasswordNotExist = "NotExist";
                            return View("ForgotPassword");
                        }

                        ModelState.AddModelError("", "User is invalid");
                        ViewBag.MailNotExist = true;
                        return View("ForgotPassword");
                    }
                    if (playerdb.PlayerImage != null)
                    {

                        //string imreBase64Data = Convert.ToBase64String(playerdb.PlayerImage);
                        //string imgDataURL = string.Format("data:image/png;base64,{0}", imreBase64Data);
                        //ViewBag.ImageData = imgDataURL;
                        HttpContext.Session.Set("ProfileImage", playerdb.PlayerImage);
                    }
                    if (playerdb.Role.RoleName == "Admin")
                    {
                        ModelState.AddModelError("", "User is invalid");
                        ViewBag.MailExist = 3;
                        return View("ForgotPassword");

                    }
                    var identity = new ClaimsIdentity(CookieAuthenticationDefaults.AuthenticationScheme, ClaimTypes.Name, ClaimTypes.Role);
                    identity.AddClaim(new Claim(ClaimTypes.NameIdentifier, playerdb.ScreenName));
                    identity.AddClaim(new Claim(ClaimTypes.Name, playerdb.ScreenName));
                    identity.AddClaim(new Claim("PlayerId", playerdb.PLayerId.ToString()));
                    identity.AddClaim(new Claim(ClaimTypes.Role, playerdb.Role.RoleName));
                    var principal = new ClaimsPrincipal(identity);
                    //await HttpContext.SignInAsync(CookieAuthenticationDefaults.AuthenticationScheme, principal, new AuthenticationProperties { IsPersistent = model.RememberMe });

                    await HttpContext.SignInAsync(
                     scheme: "FiverSecurityScheme",
                     principal: principal,
                     properties: new AuthenticationProperties
                     {
                         ExpiresUtc = DateTime.UtcNow.AddMinutes(30)
                     });

                    if (playerdb.IsLogin == false || playerdb.IsLogin == null)
                    {

                        //EMAIL SENDING
                        var confirmEmailLink = "<a class='style4' href='" + Url.Action("Index", "Home", new { }, "http") + "'>Login to Fish For Cash</a>";
                        string subject = "LOGIN CONFIRMATION";
                        string dynamicContent = @"<td bgcolor='#97cfe7'>
                       <p align='center' class='style3'><br />
                            Hi {FirstName},</p>
                            <p align='center' class='style3'>Thanks for registering to play Fish for Cash. <br>
                            Your account has been validated and you can now login<br>
                            to win cash &amp; prizes at www.fishforcash.nz</p>
                            <p align='center' class='style3'>{ValidateAccountLink}</p>
                            <p align='center' class='style3'><br />
                            Good luck!<br />
                            <br />
                            The Fish for Cash Team<br />
                            <br />
                            </p>
                       </td>";
                        string body = EmailHelper.ConfigureRegisterMailBody(playerdb.FirstName, "ACCOUNT VALIDATED", confirmEmailLink, dynamicContent, EmailHelper.GetEmailBody());
                        EmailHelper.SendEmail(playerdb.EmailId, body, subject);
                        //END EMAIL SEND
                        playerdb.IsLogin = true;
                        playerdb.TodayDate = DateTime.Now.Date;
                        iplayerBusiness.UpdatePlayer(playerdb);
                    }
                    //else if (playerdb.IsLogin == true && playerdb.TodayDate.Value.Date < DateTime.Now.Date)
                    //{
                    //    EmailHelper.SendEmail(model.EmailId, body, subject);
                    //    playerdb.IsLogin = true;
                    //    playerdb.TodayDate = DateTime.Now.Date;
                    //    iplayerBusiness.UpdatePlayer(playerdb);
                    //}

                    //return RedirectToAction("Index", "Admin");
                    
                    if (User.Identity.IsAuthenticated)
                    {
                        if (User.Claims.ToArray()[3].Value == "Player")
                        {
                  
                            return RedirectToAction("DashBoard", "PlayerAccount");
                        }
                           
                    }



                    return RedirectToAction("DashBoard", "PlayerAccount" );
                }
                else
                {
                    ModelState.AddModelError("", "Username or Password is blank");
                    return View("ForgotPassword");
                }
            }
            catch (Exception ex)
            {
                return ErrorView(ex);
            }
        }
        public async Task<IActionResult> Logout()
        {
            //await HttpContext.SignOutAsync(
            //   CookieAuthenticationDefaults.AuthenticationScheme);
           await HttpContext.SignOutAsync();
            HttpContext.Session.Clear();
            return RedirectToAction("Index", "Home");
        }
        public IActionResult Register()
        {
            try
            {
                var countryList = icountryBusiness.GetCountries();
                ViewBag.country = new SelectList(countryList, "CountryId", "CountryName");
                return View();
            }
            catch (Exception ex)
            {
                return ErrorView(ex);
            }
        }
        [HttpPost]
        [ValidateAntiForgeryToken]
        public IActionResult Register(RegistrationViewModel playerModel)
        {
            try
            {
                var countryList = icountryBusiness.GetCountries();
                ViewBag.country = new SelectList(countryList, "CountryId", "CountryName");
                if (ModelState.IsValid)
                {
                    if (iplayerBusiness.IsPlayerExist(playerModel.EmailId.ToLower()))
                    {
                        ModelState.AddModelError("EmailId", "Email id already exist.");
                        return View();
                    }

                    var plainText = EncHelper.Encryptdata(playerModel.Password);
                    if (string.IsNullOrWhiteSpace(plainText))
                    {
                        ModelState.AddModelError("", "Username or Password is invalid.");
                        return View();
                    }
                    playerModel.EmailId = playerModel.EmailId.ToLower();
                    playerModel.CreatedDate = DateTime.Now;
                    playerModel.Password = plainText;
                    playerModel.RoleId = 3;
                    playerModel.Active = true;
                    playerModel.WatchGamePlay = true;
                    PlayerModel model = new PlayerModel();
                    Mapper.Map(playerModel, model);
                    iplayerBusiness.AddNewPlayer(model);

                    var lnkHref = "<a class='style4' href='" + Url.Action("ActivateAccount", "Account", new { email = playerModel.EmailId }, "http") + "' class='style4'>Validate your Account</a>";
                    string subject = "ACCOUNT VERIFICATION";
                    string dynamicContent = @"<td bgcolor='#97cfe7'>
                <p align = 'center' class='style3'>
                    <br />
                    Hi {FirstName},
                </p>
                <p align = 'center' class='style3'>Thanks for registering to Play Fish for Cash. </p>
                <p align = 'center' class='style3'>
                    To complete the sign up process please click on the link below<br />
                    to validate your account.
                </p>
                <p align = 'center' class='style3'>{ValidateAccountLink}</p>
                <p align = 'center' class='style3'>
                    <br />
                    Thanks and good luck!<br />
                    <br />
                    The Fish for Cash Team<br />
                    <br />
                </p>
            </td>";
                    string body = EmailHelper.ConfigureRegisterMailBody(playerModel.FirstName, "ACCOUNT VERIFICATION", lnkHref, dynamicContent, EmailHelper.GetEmailBody());
                    EmailHelper.SendEmail(playerModel.EmailId, body, subject);
                    return RedirectToAction("RegistrationSuccessful", new { emailAddress = playerModel.EmailId });
                }
                return View();
            }
            catch (Exception ex)
            {
                return ErrorView(ex);
            }
        }
        public IActionResult ActivateAccount(string email)
        {
            if (iplayerBusiness.IsPlayerExist(email))
            {
                iplayerBusiness.ActivatePlayer(email);
            }
            return RedirectToAction("AccountActivatedSuccessful");
        }
        public JsonResult GetStateById(int countryId)
        {
            var states = icountryBusiness.GetState(countryId).Where(c => c.CountryId == countryId);
            return Json(states);
        }

        public IActionResult ForgotPassword()
        {
            ViewBag.MailPasswordNotExist = "Exist";
            ViewBag.MailExist = 0;
            ViewBag.PlayerNotActive = 0;
            ViewBag.HomeForgetPassword = "Reset";
            ViewBag.PlayerNotExistMsg = "Exist";
            ViewBag.ResetPasswordMsg = "NotResetPasswordMsg";
            return View();
        }
        [HttpPost]
        public IActionResult ForgotPassword(string EmailId)
        {
            ViewBag.MailPasswordNotExist = "Exist";
            ViewBag.MailExist = 0;
            ViewBag.PlayerNotActive = 0;
            ViewBag.HomeForgetPassword = "Reset";
            ViewBag.PlayerNotExistMsg = "Exist";
            ViewBag.ResetPasswordMsg = "NotResetPasswordMsg";
            Player playerdb = iplayerBusiness.GetPlayerByEmail(EmailId);
            if (iplayerBusiness.IsPlayerExist(EmailId))
            {
                var token = Guid.NewGuid();
                iplayerBusiness.UpdateToken(token, EmailId);
                var passwordResetLink = "<a class='style4' href='" + Url.Action("ResetPassword", "Account", new { email = EmailId, code = token }, "http") + "' class='style4'>Reset My Password</a>";
                string subject = "PASSWORD RESET";

                string dynamicContent = @"<td bgcolor='#97cfe7'>
                   <p align='center' class='style3'><br />
        Hi {FirstName},</ p >
      <p align = 'center' class='style3'>Please click on the link below to reset your password<br>
         for your account at www.fishforcash.nz</p>
         <p align = 'center' class='style3'>{ValidateAccountLink}</p>
      <p align = 'center' class='style3'><br />
        If you didn't request this, then please ignore this email.<br />
        <br />
        The Fish for Cash Team<br />
        <br />
            </td>";
                string body = EmailHelper.ConfigureRegisterMailBody(playerdb.FirstName, "PASSWORD RESET", passwordResetLink, dynamicContent, EmailHelper.GetEmailBody());
                EmailHelper.SendEmail(EmailId, body, subject);
                ViewBag.HomeForgetPassword = "NotReset";
                ViewBag.ResetPasswordMsg = "ResetPasswordMsg";
                return View();
            }
            else
            {
                ViewBag.PlayerNotExistMsg = "PlayerNotExist";
                return View();
            }
        }

        public PartialViewResult LoginPartial()
        {
            LoginViewModel loginViewModel = new LoginViewModel();
            return PartialView("_LoginPartial", loginViewModel);
        }


        public IActionResult ResetPassword(string email, string code)
        {
            ViewBag.Message = 0;
            ResetPasswordViewModel model = new ResetPasswordViewModel();
            model.ReturnToken = code;
            model.EmailId = email;
            return View(model);
        }
        [HttpPost]
        public IActionResult ResetPassword(ResetPasswordViewModel model)
        {
            if (ModelState.IsValid)
            {
                Player playerModel = iplayerBusiness.UpdatePassword(new Guid(model.ReturnToken), model.EmailId, EncHelper.Encryptdata(model.NewPassword));
                ViewBag.Message = playerModel != null ? 1 : 2;
            }
            return View();
        }
        public IActionResult ErrorView()
        {
            return View();
        }
        public IActionResult DashBoard()
        {
            return View();
        }

        public JsonResult IsMailAlreadyExist(string EmailId)
        {
            bool isExist = iplayerBusiness.IsPlayerExist(EmailId);
            return Json(!isExist);
        }

        public JsonResult IsScreenNameAlreadyExist(string ScreenName)
        {
            bool isExist = iplayerBusiness.IsPlayerScreenNameExist(ScreenName);
            return Json(!isExist);
        }

        public IActionResult ValidatePlayerAccount(string emailId)
        {
            Player playerdb = iplayerBusiness.GetPlayerByEmail(emailId);
            if (playerdb != null)
            {
                var lnkHref = "<a class='style4' href='" + Url.Action("ActivateAccount", "Account", new { email = emailId }, "http") + "'>Validate your Account</a>";
                string subject = "ACCOUNT VERIFICATION";
                string dynamicContent = @"<td bgcolor='#97cfe7'>
                <p align = 'center' class='style3'>
                    <br />
                    Hi {FirstName},
                </p>
                <p align = 'center' class='style3'>Thanks for registering to Play Fish for Cash. </p>
                <p align = 'center' class='style3'>
                    To complete the sign up process please click on the link below<br />
                    to validate your account.
                </p>
                <p align = 'center' class='style3'>{ValidateAccountLink}</p>
                <p align = 'center' class='style3'>
                    <br />
                    Thanks and good luck!<br />
                    <br />
                    The Fish for Cash Team<br />
                    <br />
                </p>
            </td>";
                string body = EmailHelper.ConfigureRegisterMailBody(playerdb.FirstName, "ACCOUNT VERIFICATION", lnkHref, dynamicContent, EmailHelper.GetEmailBody());
                EmailHelper.SendEmail(emailId, body, subject);

                ViewBag.MailPasswordNotExist = "Exist";
                ViewBag.MailExist = 0;
                ViewBag.PlayerNotActive = 5;

                return RedirectToAction("RegistrationSuccessful", new { emailAddress = emailId });
            }
            return Content("Invalid email address");

        }


        public IActionResult RegistrationSuccessful(string emailAddress)
        {
            return View("RegistrationSuccessful", emailAddress);
        }

        public IActionResult AccountActivatedSuccessful()
        {
            return View();
        }

        public IActionResult SendAccountActivationMail(string emailId)
        {
            Player playerdb = iplayerBusiness.GetPlayerByEmail(emailId);
            if (playerdb != null)
            {
                var confirmEmailLink = "<a class='style4' href='" + Url.Action("ActivateAccount", "Account", new { email = emailId }, "http") + "'>Validate your Account</a>";
                string subject = "ACCOUNT VERIFICATION";
                string dynamicContent = @"<td bgcolor='#97cfe7'>
                <p align = 'center' class='style3'>
                    <br />
                    Hi {FirstName},
                </p>
                <p align = 'center' class='style3'>Thanks for registering to Play Fish for Cash. </p>
                <p align = 'center' class='style3'>
                    To complete the sign up process please click on the link below<br />
                    to validate your account.
                </p>
                <p align = 'center' class='style3'>{ValidateAccountLink}</p>
                <p align = 'center' class='style3'>
                    <br />
                    Thanks and good luck!<br />
                    <br />
                    The Fish for Cash Team<br />
                    <br />
                </p>
            </td>";
                string body = EmailHelper.ConfigureRegisterMailBody(playerdb.FirstName, "ACCOUNT VERIFICATION", confirmEmailLink, dynamicContent, EmailHelper.GetEmailBody());
                EmailHelper.SendEmail(playerdb.EmailId, body, subject);
                return RedirectToAction("RegistrationSuccessful", new { emailAddress = emailId });
            }
            return Content("Invalid email address");
        }

      
    }
}