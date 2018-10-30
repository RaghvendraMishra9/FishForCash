using ExpressMapper;
using ExpressMapper.Extensions;
using FishForCash.Business.Interfaces;
using FishForCash.Domain.User;
using FishForCash.Repository;
using FishForCash.Repository.DB;
using FishForCash.Repository.Interface;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FishForCash.Business.Concrete
{
    public class UserBusiness : IUserBusiness
    {
        private readonly UserRepository userRepository;

        public UserBusiness(IUnitOfWork unit)
        {
            userRepository = new UserRepository(unit);
        }

        public UserModel AddNewUser(UserModel model)
        {
            User user = new User();
            Mapper.Map(model, user);
            userRepository.Insert(user);
            Mapper.Map(user, model);
            return model;
        }

        public List<UserModel> GetAllUser()
        {
            return userRepository.GetAll().ToList().Map<List<User>, List<UserModel>>();
        }

        public UserModel GetUser(int userId)
        {
            return userRepository.SingleOrDefault(u => u.UserId == userId).Map<User, UserModel>();
        }
        public bool IsValidUser(string email, string password)
        {
            return userRepository.Exists(u => u.UserEmail == email && u.Password == password);
        }
    }
}
