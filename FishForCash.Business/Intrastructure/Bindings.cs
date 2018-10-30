using Microsoft.Extensions.DependencyInjection;
using FishForCash.Repository.Concrete;
using FishForCash.Repository.Interface;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using FishForCash.Business.Interfaces;
using FishForCash.Business.Concrete;

namespace FishForCash.Business.Intrastructure
{
   public class Bindings
    {
        public static void AddBindings(IServiceCollection services)
        {
            services.AddTransient<IUnitOfWork, UnitOfWork>();
            services.AddTransient<IUserBusiness, UserBusiness>();
            services.AddTransient<IPlayerBusiness, PlayerBusiness>();
            services.AddTransient<ICountryBusiness, CountryBusiness>();
            services.AddTransient<IWebCodesBusiness, WebCodeBusiness>();
            services.AddTransient<IPrizeBusiness, PrizeBusiness>();
            services.AddTransient<IWinningDetailBusiness, WinningDetailBusiness>();
            services.AddTransient<ITransactionBusiness, TransactionBusiness>();
            services.AddTransient<IAlreadyPlayedBusiness, AlreadyplayedBusiness>();
            services.AddTransient<ISmudgedBusiness, SmudgedBusiness>();
            services.AddTransient<IBootyBusiness, BootyBusiness>();
            services.AddTransient<ITreasureChestBusiness, TreasureChestBusiness>();
            services.AddTransient<IBootyTradeBusiness, BootyTradeBusiness>();
            services.AddTransient<IPrizeReddemBusiness, PrizeRedeemBusiness>();
        }
    }
}
