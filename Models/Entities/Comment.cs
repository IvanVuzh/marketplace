using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace MarketPlace5.Models.Entities
{
    public class Comment
    {
        [Key]
        [Required]
        public string Id { get; set; } = Guid.NewGuid().ToString();

        [Required]
        [StringLength(500,MinimumLength = 1, ErrorMessage = "Product name cannot be longer than 300 characters")]
        public string Text{ get; set; }

        [Required]
        [ForeignKey("AuthorId")]
        public string AuthorId { get; set; }
        [ForeignKey("AuthorId")]
        public User Author { get; set; }

        [Required]
        [ForeignKey("ProductId")]
        public string ProductId { get; set; }
        [ForeignKey("ProductId")]
        public Product Product { get; set; }
    }
}
