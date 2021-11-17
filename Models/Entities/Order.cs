using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace MarketPlace5.Models.Entities
{
    public class Order
    {
        [Key]
        [Required]
        public string Id { get; set; } = Guid.NewGuid().ToString();

        [Required]
        [ForeignKey("BuyerId")]
        public string BuyerId { get; set; }
        [ForeignKey("BuyerId")]
        public User Buyer { get; set; }
    }
}
