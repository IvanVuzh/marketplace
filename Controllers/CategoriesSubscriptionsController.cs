using MarketPlace5.Services.Implementations;
using MarketPlace5.Services.Interfaces;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using MarketPlace5.Models.Entities;
using MarketPlace5.Models.DTOs;

namespace MarketPlace.Controllers
{
    [Route("categories-subscriptions")]
    public class CategoriesSubscriptionsController : Controller
    {
        readonly ICategoriesSubscriptionsService service;

        public CategoriesSubscriptionsController(ICategoriesSubscriptionsService _service)
        {
            this.service = _service;
        }

        [Route("get-paginated")]
        [HttpGet]
        public ActionResult<List<CategoriesSubscription>> GetCategoriesSubscriptionsPaginated(int offset, int limit)
        {
            List<CategoriesSubscription> categoriesSubscriptions = service.GetCategoriesSubscriptionsPaginated(offset, limit);
            int count = service.getCount();
            return Ok(new { categoriesSubscriptions, count });
        }

        [Route("get")]
        [HttpGet]
        public ActionResult<CategoriesSubscription> GetCategoriesSubscriptionById(string sellerId, string categoryId)
        {
            CategoriesSubscription categoriesSubscription = service.GetCategoriesSubscriptionById(sellerId, categoryId);
            return Ok(categoriesSubscription);
        }

        [Route("create")]
        [HttpPost]
        public ActionResult<CategoriesSubscription> CreateCategoriesSubscription([FromBody] CategoriesSubscriptionDTO data)
        {
            CategoriesSubscription res = service.CreateCategoriesSubscription(data);  
            return Ok(res);
        }

        [Route("delete")]
        [HttpDelete]
        public ActionResult DeleteCategoriesSubscription(string sellerId, string categoryId)
        {
            try
            {
                service.DeleteCategoriesSubscription(sellerId, categoryId);
                return Ok("Order item deleted");
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [Route("update")]
        [HttpPost]
        public ActionResult UpdateCategoriesSubscription(string sellerId, string categoryId, [FromBody] CategoriesSubscriptionDTO data)
        {
            try
            {
                service.UpdateCategoriesSubscription(sellerId, categoryId, data);
                return Ok("Order item updated");
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
    }
}
