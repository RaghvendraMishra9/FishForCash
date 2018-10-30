using FishForCash.Repository.Concrete;
using FishForCash.Repository.Interface;
using FishForCash.Repository.DB;


namespace FishForCash.Repository
{
   public class UserRepository : BaseRepository<User>
    {
        public UserRepository(IUnitOfWork unit) : base(unit)
        { }
       
    }
}
