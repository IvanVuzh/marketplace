using MarketPlace5.Models.Enums;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace MarketPlace5.Models.DTOs
{
    public class CommentDTO
    {
        public string Text { get; set; }
        public string AuthorId { get; set; }
        public string ProductId { get; set; }
    }
}
