using MarketPlace5.Services.Implementations;
using MarketPlace5.Services.Interfaces;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using MarketPlace5.Models.Entities;
using MarketPlace5.Models.DTOs;

namespace MarketPlace5.Controllers
{
    [Route("categories")]
    public class CategoryController : Controller
    {
        readonly ICategoryService service;

        public CategoryController(ICategoryService _service)
        {
            this.service = _service;
        }

        [Route("get-paginated")]
        [HttpGet]
        public ActionResult<List<Category>> GetCategoriesPaginated(int offset, int limit)
        {
            List<Category> categories = service.GetCategoriesPaginated(offset, limit);
            int count = service.getCount();
            return Ok(new {categories, count});
        }

        [Route("get/{id}")]
        [HttpGet]
        public ActionResult<Category> GetCategoryById(string id)
        {
            Category category= service.GetCategoryById(id);
            return Ok(category);
        }

        [Route("create")]
        [HttpPost]
        public ActionResult<Category> CreateCategory([FromBody] CategoryDTO data)
        {
            Category res = service.CreateCategory(data);  
            return Ok(res);
        }

        [Route("delete/{id}")]
        [HttpDelete]
        public ActionResult DeleteCategory(string id)
        {
            try
            {
                service.DeleteCategory(id);
                return Ok("Category deleted");
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [Route("update/{id}")]
        [HttpPost]
        public ActionResult UpdateCategory(string id, [FromBody] CategoryDTO data)
        {
            try
            {
                service.UpdateCategory(id, data);
                return Ok("Category updated");
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
    }
}
