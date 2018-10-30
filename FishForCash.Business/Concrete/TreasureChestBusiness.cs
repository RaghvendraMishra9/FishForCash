using FishForCash.Business.Interfaces;
using FishForCash.Repository;
using FishForCash.Repository.DB;
using FishForCash.Repository.Interface;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Text;
using System.Threading.Tasks;

namespace FishForCash.Business.Concrete
{
    public class TreasureChestBusiness : ITreasureChestBusiness
    {
        private readonly TreasureChestRepository treasureChestRepository;
        public TreasureChestBusiness(IUnitOfWork unit)
        {
            treasureChestRepository = new TreasureChestRepository(unit);
        }
        public TreasureChest GetByPlayer(int playerId)
        {
            return treasureChestRepository.FindBy(predicate: x => x.PLayerId == playerId);
        }
        public void ClearTreasure(int playerId)
        {
            TreasureChest treasureChest = GetByPlayer(playerId);
            treasureChest.a = 0;
            treasureChest.b = 0;
            treasureChest.c = 0;
            treasureChest.d = 0;
            treasureChest.e = 0;
            treasureChest.f = 0;
            treasureChest.g = 0;
            treasureChest.h = 0;
            treasureChest.i = 0;
            treasureChest.j = 0;
            treasureChest.k = 0;
            treasureChest.l = 0;
            treasureChest.m = 0;
            treasureChest.n = 0;
            treasureChest.o = 0;
            treasureChest.p = 0;
            treasureChest.q = 0;
            treasureChest.r = 0;
            treasureChestRepository.Update(treasureChest);
        }
        public void UpdateTreasure(string icon, int playerId)
        {
            TreasureChest treasureChest = null;
            treasureChest = GetByPlayer(playerId);
            if (treasureChest == null)
            {
                treasureChest = new TreasureChest();
                treasureChest.PLayerId = playerId;
                ConfigureObject(icon, treasureChest, true);
                treasureChestRepository.Insert(treasureChest);
            }
            else
            {
                ConfigureObject(icon, treasureChest, false);
                treasureChestRepository.Update(treasureChest);
            }
        }

        public List<TreasureChest> TreasureChestList()
        {
            return treasureChestRepository.GetAll().ToList();
        }
        private void ConfigureObject(string fieldName, TreasureChest treasureChest, bool isInsert)
        {
            if (fieldName.Equals("a"))
            {
                treasureChest.a = isInsert ? 1 : treasureChest.a += 1;
            }
            else if (fieldName.Equals("b"))
            {
                treasureChest.b = isInsert ? 1 : treasureChest.b += 1;
            }
            else if (fieldName.Equals("c"))
            {
                treasureChest.c = isInsert ? 1 : treasureChest.c += 1;
            }
            else if (fieldName.Equals("d"))
            {
                treasureChest.d = isInsert ? 1 : treasureChest.d += 1;
            }
            else if (fieldName.Equals("e"))
            {
                treasureChest.e = isInsert ? 1 : treasureChest.e += 1;
            }
            else if (fieldName.Equals("f"))
            {
                treasureChest.f = isInsert ? 1 : treasureChest.f += 1;
            }
            else if (fieldName.Equals("g"))
            {
                treasureChest.g = isInsert ? 1 : treasureChest.g += 1;
            }
            else if (fieldName.Equals("h"))
            {
                treasureChest.h = isInsert ? 1 : treasureChest.h += 1;
            }
            else if (fieldName.Equals("i"))
            {
                treasureChest.i = isInsert ? 1 : treasureChest.i += 1;
            }
            else if (fieldName.Equals("j"))
            {
                treasureChest.j = isInsert ? 1 : treasureChest.j += 1;
            }
            else if (fieldName.Equals("k"))
            {
                treasureChest.k = isInsert ? 1 : treasureChest.k += 1;
            }
            else if (fieldName.Equals("l"))
            {
                treasureChest.l = isInsert ? 1 : treasureChest.l += 1;
            }
            else if (fieldName.Equals("m"))
            {
                treasureChest.m = isInsert ? 1 : treasureChest.m += 1;
            }
            else if (fieldName.Equals("n"))
            {
                treasureChest.n = isInsert ? 1 : treasureChest.n += 1;
            }
            else if (fieldName.Equals("o"))
            {
                treasureChest.o = isInsert ? 1 : treasureChest.o += 1;
            }
            else if (fieldName.Equals("p"))
            {
                treasureChest.p = isInsert ? 1 : treasureChest.p += 1;

            }
            else if (fieldName.Equals("q"))
            {
                treasureChest.q = isInsert ? 1 : treasureChest.q += 1;
            }
            else if (fieldName.Equals("r"))
            {
                treasureChest.r = isInsert ? 1 : treasureChest.r += 1;
            }
        }

        public void SwapBooty(string icon, int playerId)
        {
            TreasureChest treasureChest = null;
            treasureChest = GetByPlayer(playerId);
            if (treasureChest != null)
            {
                ConfigureObjectSwap(icon, treasureChest);
                treasureChestRepository.Update(treasureChest);
            }
        }
        private void ConfigureObjectSwap(string fieldName, TreasureChest treasureChest)
        {
            if (fieldName.Equals("a"))
            {
                treasureChest.a = treasureChest.a -= 5;
            }
            else if (fieldName.Equals("b"))
            {
                treasureChest.b = treasureChest.b -= 5;
            }
            else if (fieldName.Equals("c"))
            {
                treasureChest.c = treasureChest.c -= 5;
            }
            else if (fieldName.Equals("d"))
            {
                treasureChest.d = treasureChest.d -= 5;
            }
            else if (fieldName.Equals("e"))
            {
                treasureChest.e = treasureChest.e -= 5;
            }
            else if (fieldName.Equals("f"))
            {
                treasureChest.f = treasureChest.f -= 5;
            }
            else if (fieldName.Equals("g"))
            {
                treasureChest.g = treasureChest.g -= 5;
            }
            else if (fieldName.Equals("h"))
            {
                treasureChest.h = treasureChest.h -= 5;
            }
            else if (fieldName.Equals("i"))
            {
                treasureChest.i = treasureChest.i -= 5;
            }
            else if (fieldName.Equals("j"))
            {
                treasureChest.j = treasureChest.j -= 5;
            }
            else if (fieldName.Equals("k"))
            {
                treasureChest.k = treasureChest.k -= 5;
            }
            else if (fieldName.Equals("l"))
            {
                treasureChest.l = treasureChest.l -= 5;
            }
            else if (fieldName.Equals("m"))
            {
                treasureChest.m = treasureChest.m -= 5;
            }
            else if (fieldName.Equals("n"))
            {
                treasureChest.n = treasureChest.n -= 5;
            }
            else if (fieldName.Equals("o"))
            {
                treasureChest.o = treasureChest.o -= 5;
            }
            else if (fieldName.Equals("p"))
            {
                treasureChest.p = treasureChest.p -= 5;

            }
            else if (fieldName.Equals("q"))
            {
                treasureChest.q = treasureChest.q -= 5;
            }
            else if (fieldName.Equals("r"))
            {
                treasureChest.r = treasureChest.r -= 5;
            }
        }
        public int TreasureChestCount(int playerId)
        {
            TreasureChest treasureChest = null;
            treasureChest = GetByPlayer(playerId);
            if (treasureChest != null)
            {
                return treasureChest.a +
                    treasureChest.b +
                    treasureChest.c +
                    treasureChest.d +
                    treasureChest.e +
                    treasureChest.f +
                    treasureChest.g +
                    treasureChest.h +
                    treasureChest.i +
                    treasureChest.j +
                    treasureChest.k +
                    treasureChest.l +
                    treasureChest.m +
                    treasureChest.n +
                    treasureChest.o +
                    treasureChest.p +
                    treasureChest.q +
                    treasureChest.r;
            }
            else
                return 0;
        }
       
        public void UpdateTreasureBooty(string icon, int playerId, int bootyqty)
        {
            TreasureChest treasureChest = null;
            treasureChest = GetByPlayer(playerId);
            if (treasureChest != null)
            {
                ConfigureObjectUpdate(icon, treasureChest,  bootyqty);
                treasureChestRepository.Update(treasureChest);
            }
        }
        private void ConfigureObjectUpdate(string fieldName, TreasureChest treasureChest ,int bootyqty)
        {
            if (fieldName.Equals("a"))
            {
                treasureChest.a = treasureChest.a -= bootyqty;
            }
            else if (fieldName.Equals("b"))
            {
                treasureChest.b = treasureChest.b -= bootyqty;
            }
            else if (fieldName.Equals("c"))
            {
                treasureChest.c = treasureChest.c -= bootyqty;
            }
            else if (fieldName.Equals("d"))
            {
                treasureChest.d = treasureChest.d -= bootyqty;
            }
            else if (fieldName.Equals("e"))
            {
                treasureChest.e = treasureChest.e -= bootyqty;
            }
            else if (fieldName.Equals("f"))
            {
                treasureChest.f = treasureChest.f -= bootyqty;
            }
            else if (fieldName.Equals("g"))
            {
                treasureChest.g = treasureChest.g -= bootyqty;
            }
            else if (fieldName.Equals("h"))
            {
                treasureChest.h = treasureChest.h -= bootyqty;
            }
            else if (fieldName.Equals("i"))
            {
                treasureChest.i = treasureChest.i -= bootyqty;
            }
            else if (fieldName.Equals("j"))
            {
                treasureChest.j = treasureChest.j -= bootyqty;
            }
            else if (fieldName.Equals("k"))
            {
                treasureChest.k = treasureChest.k -= bootyqty;
            }
            else if (fieldName.Equals("l"))
            {
                treasureChest.l = treasureChest.l -= bootyqty;
            }
            else if (fieldName.Equals("m"))
            {
                treasureChest.m = treasureChest.m -= bootyqty;
            }
            else if (fieldName.Equals("n"))
            {
                treasureChest.n = treasureChest.n -= bootyqty;
            }
            else if (fieldName.Equals("o"))
            {
                treasureChest.o = treasureChest.o -= bootyqty;
            }
            else if (fieldName.Equals("p"))
            {
                treasureChest.p = treasureChest.p -= bootyqty;

            }
            else if (fieldName.Equals("q"))
            {
                treasureChest.q = treasureChest.q -= bootyqty;
            }
            else if (fieldName.Equals("r"))
            {
                treasureChest.r = treasureChest.r -= bootyqty;
            }
        }

        public void UpdateTreasureBootyAdd(string icon, int playerId, int bootyqty)
        {
            TreasureChest treasureChest = null;
            treasureChest = GetByPlayer(playerId);
            if (treasureChest != null)
            {
                ConfigureObjectUpdateBooty(icon, treasureChest, bootyqty);
                treasureChestRepository.Update(treasureChest);
            }
        }
        public void ConfigureObjectUpdateBooty(string fieldName, TreasureChest treasureChest, int bootyqty)
        {
            if (fieldName.Equals("a"))
            {
                treasureChest.a = treasureChest.a += bootyqty;
            }
            else if (fieldName.Equals("b"))
            {
                treasureChest.b = treasureChest.b += bootyqty;
            }
            else if (fieldName.Equals("c"))
            {
                treasureChest.c = treasureChest.c += bootyqty;
            }
            else if (fieldName.Equals("d"))
            {
                treasureChest.d = treasureChest.d += bootyqty;
            }
            else if (fieldName.Equals("e"))
            {
                treasureChest.e = treasureChest.e += bootyqty;
            }
            else if (fieldName.Equals("f"))
            {
                treasureChest.f = treasureChest.f += bootyqty;
            }
            else if (fieldName.Equals("g"))
            {
                treasureChest.g = treasureChest.g += bootyqty;
            }
            else if (fieldName.Equals("h"))
            {
                treasureChest.h = treasureChest.h += bootyqty;
            }
            else if (fieldName.Equals("i"))
            {
                treasureChest.i = treasureChest.i += bootyqty;
            }
            else if (fieldName.Equals("j"))
            {
                treasureChest.j = treasureChest.j += bootyqty;
            }
            else if (fieldName.Equals("k"))
            {
                treasureChest.k = treasureChest.k += bootyqty;
            }
            else if (fieldName.Equals("l"))
            {
                treasureChest.l = treasureChest.l += bootyqty;
            }
            else if (fieldName.Equals("m"))
            {
                treasureChest.m = treasureChest.m += bootyqty;
            }
            else if (fieldName.Equals("n"))
            {
                treasureChest.n = treasureChest.n += bootyqty;
            }
            else if (fieldName.Equals("o"))
            {
                treasureChest.o = treasureChest.o += bootyqty;
            }
            else if (fieldName.Equals("p"))
            {
                treasureChest.p = treasureChest.p += bootyqty;

            }
            else if (fieldName.Equals("q"))
            {
                treasureChest.q = treasureChest.q += bootyqty;
            }
            else if (fieldName.Equals("r"))
            {
                treasureChest.r = treasureChest.r += bootyqty;
            }
        }
    }
}
