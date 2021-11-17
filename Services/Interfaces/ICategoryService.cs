using MarketPlace5.Models.DTOs;
using MarketPlace5.Models.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace MarketPlace5.Services.Interfaces
{
    public interface ICategoryService
    {
        public List<Category> GetCategoriesPaginated(int offset, int limit);
        public Category GetCategoryById(string id);
        public void DeleteCategory(string id);
        public void UpdateCategory(string id, CategoryDTO newData);
        public Category CreateCategory(CategoryDTO data);
        public int getCount();

    }
}
