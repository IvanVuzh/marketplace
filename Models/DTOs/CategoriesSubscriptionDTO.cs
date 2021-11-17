using MarketPlace5.Models.Enums;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace MarketPlace5.Models.DTOs
{
    public class CategoriesSubscriptionDTO
    {
        public string SellerId { get; set; }
        public string CategoryId { get; set; }
        public DateTime ExpirationTime { get; set; }
    }
}
