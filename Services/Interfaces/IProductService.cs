using MarketPlace5.Models.DTOs;
using MarketPlace5.Models.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace MarketPlace5.Services.Interfaces
{
    public interface IProductService
    {
        public List<Product> GetProductsPaginated(int offset, int limit);
        public Product GetProductById(string id);
        public void DeleteProduct(string id);
        public void UpdateProduct(string id, ProductDTO newData);
        public Product CreateProduct(ProductDTO data);
        public int getCount();

    }
}
