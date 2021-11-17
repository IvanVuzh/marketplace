using MarketPlace5.Models;
using MarketPlace5.Models.DTOs;
using MarketPlace5.Models.Entities;
using MarketPlace5.Services.Interfaces;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace MarketPlace5.Services.Implementations
{
    public class ProductService : IProductService
    {
        readonly MarketPlaceDBContext db;
        public ProductService(MarketPlaceDBContext db)
        {
            this.db = db;
        }

        public Product CreateProduct(ProductDTO data)
        {
            var res = new Product()
            {
                Id = Guid.NewGuid().ToString(),
                Name = data.Name,
                CategoryId = data.CategoryId,
                Price = data.Price,
                SellerId = data.SellerId,
                Category = db.Categories.FirstOrDefault(p => p.Id == data.CategoryId),
                Seller = db.Users.FirstOrDefault(p => p.Id == data.SellerId),
            };
            db.Products.Add(res);
            db.SaveChanges();
            return res;
        }

        public void DeleteProduct(string id)
        {
            Product product = db.Products.FirstOrDefault(p => p.Id == id);
            db.Products.Remove(product);
            db.SaveChanges();
        }

        public Product GetProductById(string id)
        {
            return db.Products
                .Include(p => p.Category)
                .Include(p => p.Seller)
                .FirstOrDefault(p => p.Id == id);
        }

        public List<Product> GetProductsPaginated(int offset, int limit)
        {
            return db.Products
                .AsNoTracking()
                .Skip(offset * limit)
                .Take(limit)
                .Include(p => p.Seller)
                .Include(p => p.Category)
                .ToList();
        }

        public void UpdateProduct(string id, ProductDTO newData)
        {
            var product = db.Products.FirstOrDefault(p => p.Id == id);
            db.Entry(product).CurrentValues.SetValues(newData);
            db.SaveChanges();
        }
        public int getCount()
        {
            return db.Products.Count();
        }
    }
}
