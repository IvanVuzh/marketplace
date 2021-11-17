using MarketPlace5.Models.DTOs;
using MarketPlace5.Models.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace MarketPlace5.Services.Interfaces
{
    public interface ISellerSubscriptionService
    {
        public List<SellerSubscription> GetSellerSubscriptionsPaginated(int offset, int limit);
        public SellerSubscription GetSellerSubscriptionById(string sellerId, string userId);
        public void DeleteSellerSubscription(string sellerId, string userId);
        public void UpdateSellerSubscription(string sellerId, string userId, SellerSubscriptionDTO newData);
        public SellerSubscription CreateSellerSubscription(SellerSubscriptionDTO data);
        public int getCount();

    }
}
