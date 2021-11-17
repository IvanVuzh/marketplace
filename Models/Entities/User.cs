using MarketPlace5.Models.Enums;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace MarketPlace5.Models.Entities
{
    public class User
    {
        [Key]
        [Required]
        public string Id { get; set; } = Guid.NewGuid().ToString();

        [Required]
        public double Rating { get; set; }

        [Required]
        public Role Role { get; set; }

        [Required]
        // .net core 5 does not support "unique" by data annotation
        public string LoginName { get; set; }

        [Required]
        public string Password { get; set; }

        [Required]
        // .net core 5 does not support "unique" by data annotation
        public string Email { get; set; }

        [Required]
        public string DisplayName { get; set; }
    }
}
