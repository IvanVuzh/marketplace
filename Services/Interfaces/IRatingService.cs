using MarketPlace5.Models.DTOs;
using MarketPlace5.Models.Entities;

namespace MarketPlace5.Services.Interfaces
{
    public interface IRatingService
    {
        public Ratings CreateRating(RatingsDTO data);

        public void UpdateRatings(RatingsDTO data);

        public void DeleteRatings(string sellerId, string userId);

        public double GetRatingsForSeller(string sellerId);
    }
}
