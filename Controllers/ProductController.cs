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
    [Route("products")]
    public class ProductController : Controller
    {
        readonly IProductService service;

        public ProductController(IProductService _service)
        {
            this.service = _service;
        }

        [Route("get-paginated")]
        [HttpGet]
        public ActionResult<List<Product>> GetProductPaginated(int offset, int limit)
        {
            List<Product> products = service.GetProductsPaginated(offset, limit);
            int count = service.getCount();
            return Ok(new { products, count });
        }

        [Route("get/{id}")]
        [HttpGet]
        public ActionResult<Product> GetProductById(string id)
        {
            Product product = service.GetProductById(id);
            return Ok(product);
        }

        [Route("create")]
        [HttpPost]
        public ActionResult<Product> CreateProduct([FromBody] ProductDTO data)
        {
            Product res = service.CreateProduct(data);  
            return Ok(res);
        }

        [Route("delete/{id}")]
        [HttpDelete]
        public ActionResult DeleteProduct(string id)
        {
            try
            {
                service.DeleteProduct(id);
                return Ok("Product deleted");
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [Route("update/{id}")]
        [HttpPost]
        public ActionResult UpdateProduct(string id, [FromBody] ProductDTO data)
        {
            try
            {
                service.UpdateProduct(id, data);
                return Ok("Product updated");
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
    }
}
