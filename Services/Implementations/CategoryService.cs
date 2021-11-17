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
    public class CategoryService : ICategoryService
    {
        readonly MarketPlaceDBContext db;
        public CategoryService(MarketPlaceDBContext db)
        {
            this.db = db;
        }
        public Category CreateCategory(CategoryDTO data)
        {
            var res = new Category()
            {
                Id = Guid.NewGuid().ToString(),
                Name = data.Name,
                SubscriptionPrice = data.SubscriptionPrice,
            };
            db.Categories.Add(res);
            db.SaveChanges();
            return res;
        }

        public void DeleteCategory(string id)
        {
            Category category = db.Categories.FirstOrDefault(p => p.Id == id);
            db.Categories.Remove(category);
            db.SaveChanges();
        }

        public List<Category> GetCategoriesPaginated(int offset, int limit)
        {
            return db.Categories
                .AsNoTracking()
                .Skip(offset * limit)
                .Take(limit)
                .ToList();
        }

        public Category GetCategoryById(string id)
        {
            return db.Categories.FirstOrDefault(p => p.Id == id);
        }

        public void UpdateCategory(string id, CategoryDTO newData)
        {
            var category = db.Categories.FirstOrDefault(p => p.Id == id);
            db.Entry(category).CurrentValues.SetValues(newData);
            db.SaveChanges();
        }
        public int getCount()
        {
            return db.Categories.Count();
        }
    }
}
