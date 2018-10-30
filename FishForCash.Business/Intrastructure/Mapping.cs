using ExpressMapper;
using FishForCash.Domain.Player;
using FishForCash.Repository.DB;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FishForCash.Business.Intrastructure
{
    public class Mapping
    {
        public static void RegisterBusinessMap()
        {
            Mapper.Register<Player, PlayerModel>()
                .Member(dest => dest.CountryName, src => src.Country.CountryName)
                 .Member(dest => dest.StateName, src => src.State.StateName);
        }
    }
}
