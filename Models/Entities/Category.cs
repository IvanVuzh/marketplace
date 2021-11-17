using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace MarketPlace5.Models.Entities
{
    public class Category
    {
        [Key]
        [Required]
        public string Id { get; set; } = Guid.NewGuid().ToString();

        [Required]
        [StringLength(300, ErrorMessage = "Product name cannot be longer than 300 characters")]
        public string Name { get; set; }

        [Required]
        [Range(0, Double.MaxValue)]
        public double SubscriptionPrice { get; set; }
    }
}
