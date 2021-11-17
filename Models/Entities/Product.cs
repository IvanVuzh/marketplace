using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace MarketPlace5.Models.Entities
{
    public class Product
    {
        [Key]
        [Required]
        public string Id { get; set; } = Guid.NewGuid().ToString();

        [Required]
        [StringLength(300, ErrorMessage = "Product name cannot be longer than 300 characters")]
        public string Name { get; set; }

        [Required]
        [Range(0, Double.MaxValue)]
        public double Price { get; set; }

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
    }
}
