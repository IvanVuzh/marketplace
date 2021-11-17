using MarketPlace5.Models.DTOs;
using MarketPlace5.Models.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace MarketPlace5.Services.Interfaces
{
    public interface ICategoriesSubscriptionsService
    {
        public List<CategoriesSubscription> GetCategoriesSubscriptionsPaginated(int offset, int limit);
        public CategoriesSubscription GetCategoriesSubscriptionById(string sellerId, string categoryId);
        public void DeleteCategoriesSubscription(string sellerId, string categoryId);
        public void UpdateCategoriesSubscription(string sellerId, string categoryId, CategoriesSubscriptionDTO newData);
        public CategoriesSubscription CreateCategoriesSubscription(CategoriesSubscriptionDTO data);
        public int getCount();
    }
}
