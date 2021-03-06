using MarketPlace5.Models;
using MarketPlace5.Models.DTOs;
using MarketPlace5.Models.Entities;
using MarketPlace5.Services.Interfaces;
using System.Linq;

namespace MarketPlace5.Services.Implementations
{
    public class RatingsService : IRatingService
    {
        readonly MarketPlaceDBContext db;
        public RatingsService(MarketPlaceDBContext db)
        {
            this.db = db;
        }
        public Ratings CreateRating(RatingsDTO data)
        {
            Ratings ratings = new Ratings()
            {
                UserId = data.UserId,
                Rating = data.Rating,
                SellerId = data.SellerId,
                Seller = db.Users.FirstOrDefault(p => p.Id == data.SellerId),
                User = db.Users.FirstOrDefault(p => p.Id == data.UserId)
            };
            db.Ratings.Add(ratings);
            db.SaveChanges();
            return ratings;
        }

        public void DeleteRatings(string sellerId, string userId)
        {
            Ratings ratings= db.Ratings.FirstOrDefault(p => (p.SellerId == sellerId && p.UserId == userId));
            db.Ratings.Remove(ratings);
            db.SaveChanges();
        }

        public double GetRatingsForSeller(string sellerId)
        {
            double sellerRating = db.Ratings.Where(p => p.SellerId == sellerId).Select(p => p.Rating).Average();
            return sellerRating;
        }

        public void UpdateRatings(RatingsDTO data)
        {
            Ratings ratings = db.Ratings.FirstOrDefault(p => (p.SellerId == data.SellerId && p.UserId == data.UserId));
            if(ratings == null)
            {
                CreateRating(data);
                User user = db.Users.FirstOrDefault(p => p.Id == data.SellerId);
                user.Rating = GetRatingsForSeller(data.SellerId);
            }
            else
            {
                db.Entry(ratings).CurrentValues.SetValues(data);
                db.SaveChanges();
                User user = db.Users.FirstOrDefault(p => p.Id == data.SellerId);
                user.Rating = GetRatingsForSeller(data.SellerId);
            }
            db.SaveChanges();
        }
    }
}
