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
    public class SellerSubscriptionService : ISellerSubscriptionService
    {
        readonly MarketPlaceDBContext db;
        public SellerSubscriptionService(MarketPlaceDBContext db)
        {
            this.db = db;
        }
        public SellerSubscription CreateSellerSubscription(SellerSubscriptionDTO data)
        {
            var res = new SellerSubscription()
            {
                UserId = data.UserId,
                SellerId = data.SellerId,
                Seller = db.Users.FirstOrDefault(p => p.Id == data.SellerId),
                User = db.Users.FirstOrDefault(p => p.Id == data.UserId)
            };
            db.SellerSubscriptions.Add(res);
            db.SaveChanges();
            return res;
        }

        public void DeleteSellerSubscription(string sellerId, string userId)
        {
            SellerSubscription sellerSubscription = db.SellerSubscriptions.FirstOrDefault(p => (p.SellerId == sellerId && p.UserId == userId));
            db.SellerSubscriptions.Remove(sellerSubscription);
            db.SaveChanges();
         }

        public SellerSubscription GetSellerSubscriptionById(string sellerId, string userId)
        {
            return db.SellerSubscriptions
                .Include(p => p.Seller)
                .Include(p => p.User)
                .FirstOrDefault(p => (p.SellerId == sellerId && p.UserId == userId));
        }

        public List<SellerSubscription> GetSellerSubscriptionsPaginated(int offset, int limit)
        {
            return db.SellerSubscriptions.AsNoTracking()
                .Skip(offset * limit)
                .Take(limit)
                .Include(p => p.Seller)
                .Include(p => p.User)
                .ToList();
        }

        public void UpdateSellerSubscription(string sellerId, string userId, SellerSubscriptionDTO newData)
        {
            SellerSubscription sellerSubscription = db.SellerSubscriptions.FirstOrDefault(p => (p.SellerId == sellerId && p.UserId == userId));
            db.Entry(sellerSubscription).CurrentValues.SetValues(newData);
            db.SaveChanges();
        }
        public int getCount()
        {
            return db.SellerSubscriptions.Count();
        }
    }
}
