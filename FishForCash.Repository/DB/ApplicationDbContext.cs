using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Data.Entity.Infrastructure;
using System.Data.Entity.ModelConfiguration.Conventions;
using System.Linq;
using System.Reflection.Emit;
using System.Text;
using System.Threading.Tasks;

namespace FishForCash.Repository.DB
{
    public class ApplicationDbContext : DbContext
    {
        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options)
            : base(options)
        {
        }
        protected override void OnModelCreating(ModelBuilder builder)
        {
            base.OnModelCreating(builder);
        }
        public virtual DbSet<User> Users { get; set; }
        public virtual DbSet<Player> Players { get; set; }
        public virtual DbSet<State> States { get; set; }
        public virtual DbSet<Country> Countries { get; set; }
        public virtual DbSet<Role> Roles { get; set; }
        public virtual DbSet<RecordSource> RecordSources { get; set; }
        public virtual DbSet<WebCode> WebCodes { get; set; }
        public virtual DbSet<Prize> Prizes { get; set; }
        public virtual DbSet<WinningDetail> WinningDetails { get; set; }
        public virtual DbSet<Transaction> Transactions { get; set; }
        public virtual DbSet<Smudged> Smudgeds { get; set; }
        public virtual DbSet<Alreadyplayed> Alreadyplayeds { get; set; }
        public virtual DbSet<Booty> Booties { get; set; }
        public virtual DbSet<TreasureChest> TreasureChests { get; set; }
        public virtual DbSet<BootyTrade> BootyTrades { get; set; }
        public  DbQuery<RegisteredPlayerModel> RegisteredPlayerModels { get; set; }
       
    }
}
