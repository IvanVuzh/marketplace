using MarketPlace5.Models.Enums;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace MarketPlace5.Models.DTOs
{
    public class OrderItemDTO
    {
        public string ProductId { get; set; }
        public double Price { get; set; }
        public int Amount { get; set; } = 1;
        public string OrderId { get; set; }
    }
}
