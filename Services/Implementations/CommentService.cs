using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using MarketPlace5.Models;
using MarketPlace5.Models.DTOs;
using MarketPlace5.Models.Entities;
using MarketPlace5.Services.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace MarketPlace5.Services.Implementations
{
    public class CommentService : ICommentService
    {
        readonly MarketPlaceDBContext db;
        public CommentService(MarketPlaceDBContext db)
        {
            this.db = db;
        }
        public Comment CreateComment(CommentDTO data)
        {
            var res = new Comment()
            {
                Id = Guid.NewGuid().ToString(),
                AuthorId = data.AuthorId,
                ProductId = data.ProductId,
                Text = data.Text,
                Author = db.Users.FirstOrDefault(p => p.Id == data.AuthorId),
                Product = db.Products.FirstOrDefault(p => p.Id == data.ProductId),
            };
            db.Comments.Add(res);
            db.SaveChanges();
            return res;
        }

        public void DeleteComment(string id)
        {
            Comment comment = db.Comments.FirstOrDefault(p => p.Id == id);
            db.Comments.Remove(comment);
            db.SaveChanges();
        }

        public Comment GetCommentById(string id)
        {
            return db.Comments
                .Include(p => p.Product)
                .Include(p => p.Author)
                .FirstOrDefault(p => p.Id == id);
        }

        public List<Comment> GetCommentsPaginated(int offset, int limit)
        {
            return db.Comments
                .AsNoTracking()
                .Skip(offset * limit)
                .Take(limit)
                .Include(p => p.Product)
                .Include(p =>p.Author)
                .ToList();
        }

        public void UpdateComment(string id, CommentDTO newData)
        {
            var comment = db.Comments.FirstOrDefault(p => p.Id == id);
            db.Entry(comment).CurrentValues.SetValues(newData);
            db.SaveChanges();
        }
        public int getCount()
        {
            return db.Comments.Count();
        }
    }
}
