using FishForCash.Repository.Concrete;
using FishForCash.Repository.DB;
using FishForCash.Repository.Interface;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FishForCash.Repository
{
    public class PlayerRepository : BaseRepository<Player>
    {
        private IUnitOfWork unitOfWork;
        public PlayerRepository(IUnitOfWork unit) : base(unit)
        {
            unitOfWork = unit;
        }

        public List<RegisteredPlayerModel> GetRegisteredPlayer(int numDays)
        {
            //var optionsBuilderClient = new DbContextOptionsBuilder<ApplicationDbContext>();
            //optionsBuilderClient.UseSqlServer("data source=VE030818A_NSEZ\\SQLEXPRESS2017; Database=FishForCash; user id=sa; password=pass@123;");
            //ApplicationDbContext clientContext = new ApplicationDbContext(optionsBuilderClient.Options);
          
            var data = unitOfWork.DB.RegisteredPlayerModels.FromSql(@" Execute

 DECLARE @dayNum int
 set @dayNum = 1
 WHILE @dayNum>= 1 and @dayNum<= 30
 begin

 INSERT INTO @LastRecords VALUES(DAY(GETDATE() - @dayNum), 0)


  UPDATE @LastRecords
 SET Players = (SELECT COUNT(*) FROM PLAYERS  P
  WHERE  DAY(P.CreatedDate) = DAY(GETDATE() - @dayNum)) WHERE[DAY] = DAY(GETDATE() - @dayNum)

  SET @dayNum = @dayNum + 1;
            end
  SELECT* FROM @LastRecords
");
            return data.ToList();
        }


    }
}
