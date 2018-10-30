using ExpressMapper.Extensions;
using FishForCash.Business.Interfaces;
using FishForCash.Domain.Country;
using FishForCash.Domain.State;
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
   public class CountryBusiness : ICountryBusiness
    {
        private readonly CountryRepository countryRepository;
        private readonly StateRepository stateRepository;

        public CountryBusiness(IUnitOfWork unit)
        {
            countryRepository = new CountryRepository(unit);
            stateRepository = new StateRepository(unit);
        }
        public List<CountryModel> GetCountries()
        {
            return countryRepository.GetAll().ToList().Map<List<Country>, List<CountryModel>>();
        }
        public List<Country> GetCountriesWithState()
        {
            return countryRepository.GetAll(includeProperties: "States").ToList();
        }
        public List<StateModel> GetState(int countryId)
        {
            return stateRepository.GetAll().Where(x => x.CountryId == countryId).ToList().Map<List<State>, List<StateModel>>();
        }
        public string CountryName(int countryId)
        {
           var model= countryRepository.SingleOrDefault(u => u.CountryId == countryId);          
            return model.CountryName;
        }
    }
}
