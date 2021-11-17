using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace MarketPlace5.Models.Entities
{
    public class CategoriesSubscription
    {
        [Required]
        [ForeignKey("SellerId")]
        public string SellerId { get; set; }
        [ForeignKey("SellerId")]
        public User Seller { get; set; }

        [Required]
        [ForeignKey("CategoryId")]
        public string CategoryId { get; set; }

        [ForeignKey("CategoryId")]
        public Category Category { get; set; }

        [Required]
        public DateTime ExpirationTime { get; set; }
    }
}
