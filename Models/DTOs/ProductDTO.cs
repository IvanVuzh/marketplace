using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace MarketPlace5.Models.DTOs
{
    public class ProductDTO
    {
        public string Name { get; set; }
        public double Price { get; set; }
        public string SellerId { get; set; }
        public string CategoryId { get; set; }
    }
}
