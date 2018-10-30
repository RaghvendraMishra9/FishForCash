using FishForCash.Domain.User;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FishForCash.Business.Interfaces
{
   public interface IUserBusiness
    {
        UserModel GetUser(int userId);
        bool IsValidUser(string email, string password);
        List<UserModel> GetAllUser();
        UserModel AddNewUser(UserModel model);
    }
}
