using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace MarketPlace5.Models.Entities
{
    public class OrderItem
    {
        [Required]
        [ForeignKey("ProductId")]
        public string ProductId { get; set; }
        [ForeignKey("ProductId")]
        public Product Product{ get; set; }

        [Required]
        public double Price{ get; set; }

        [Required]
        public int Amount { get; set; } = 1;

        [Required]
        [ForeignKey("OrderId")]
        public string OrderId { get; set; }
        [ForeignKey("OrderId")]
        public Order Order { get; set; }
    }
}
