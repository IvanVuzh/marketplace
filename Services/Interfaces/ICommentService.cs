using MarketPlace5.Models.DTOs;
using MarketPlace5.Models.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace MarketPlace5.Services.Interfaces
{
    public interface ICommentService
    {
        public List<Comment> GetCommentsPaginated(int offset, int limit);
        public Comment GetCommentById(string id);
        public void DeleteComment(string id);
        public void UpdateComment(string id, CommentDTO newData);
        public Comment CreateComment(CommentDTO data);
        public int getCount();

    }
}
