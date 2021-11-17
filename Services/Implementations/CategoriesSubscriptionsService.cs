using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using MarketPlace5.Models;
using MarketPlace5.Models.DTOs;
using MarketPlace5.Models.Entities;
using MarketPlace5.Services.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace MarketPlace5.Services.Implementations
{
    public class CategoriesSubscriptionsService : ICategoriesSubscriptionsService
    {
        readonly MarketPlaceDBContext db;
        public CategoriesSubscriptionsService(MarketPlaceDBContext db)
        {
            this.db = db;
        }
        public CategoriesSubscription CreateCategoriesSubscription(CategoriesSubscriptionDTO data)
        {
            var res = new CategoriesSubscription()
            {
                CategoryId = data.CategoryId,
                ExpirationTime = data.ExpirationTime,
                SellerId = data.SellerId,
                Seller = db.Users.FirstOrDefault(p => p.Id == data.SellerId),
                Category = db.Categories.FirstOrDefault(p => p.Id == data.CategoryId),
            };
            db.CategoriesSubscriptions.Add(res);
            db.SaveChanges();
            return res;
        }

        public void DeleteCategoriesSubscription(string sellerId, string categoryId)
        {
            CategoriesSubscription categoriesSubscription = db.CategoriesSubscriptions.FirstOrDefault(p => p.SellerId == sellerId && p.CategoryId == categoryId);
            db.CategoriesSubscriptions.Remove(categoriesSubscription);
            db.SaveChanges();
        }

        public CategoriesSubscription GetCategoriesSubscriptionById(string sellerId, string categoryId)
        {
            return db.CategoriesSubscriptions
                .Include(p => p.Seller)
                .Include(p => p.Category)
                .FirstOrDefault(p => p.SellerId == sellerId && p.CategoryId == categoryId);
        }

        public List<CategoriesSubscription> GetCategoriesSubscriptionsPaginated(int offset, int limit)
        {
            return db.CategoriesSubscriptions
                .AsNoTracking()
                .Skip(offset * limit)
                .Take(limit)
                .Include(p => p.Seller)
                .Include(p => p.Category)
                .ToList();
        }

        public void UpdateCategoriesSubscription(string sellerId, string categoryId, CategoriesSubscriptionDTO newData)
        {
            var categoriesSubscription = db.CategoriesSubscriptions.FirstOrDefault(p => p.SellerId == sellerId && p.CategoryId == categoryId);
            db.Entry(categoriesSubscription).CurrentValues.SetValues(newData);
            db.SaveChanges();
        }
        public int getCount()
        {
            return db.CategoriesSubscriptions.Count();
        }
    }
}
