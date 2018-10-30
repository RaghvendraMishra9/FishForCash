using FishForCash.Domain.Country;
using FishForCash.Domain.State;
using FishForCash.Repository.DB;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FishForCash.Business.Interfaces
{
    public interface ICountryBusiness
    {
        List<CountryModel> GetCountries();
        List<Country> GetCountriesWithState();
        List<StateModel> GetState(int countryId);
        string CountryName(int countryId);
    }
}
