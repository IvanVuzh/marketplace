using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace MarketPlace5.Models.Entities
{
    public class SellerSubscription
    {
        [Required]
        [ForeignKey("SellerId")]
        public string SellerId { get; set; }
        [ForeignKey("SellerId")]
        public User Seller { get; set; }

        [Required]
        [ForeignKey("UserId")]
        public string UserId { get; set; }
        [ForeignKey("UserId")]
        public User User { get; set; }
    }
}
