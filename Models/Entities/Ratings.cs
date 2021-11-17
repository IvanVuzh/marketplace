using System.ComponentModel.DataAnnotations.Schema;

namespace MarketPlace5.Models.Entities
{
    public class Ratings
    {
        [ForeignKey("UserId")]
        public string UserId { get; set; }
        [ForeignKey("UserId")]
        public User User { get; set; }

        [ForeignKey("SellerId")]
        public string SellerId{ get; set; }
        [ForeignKey("SellerId")]
        public User Seller { get; set; }

        public double Rating{ get; set; }
    }
}
