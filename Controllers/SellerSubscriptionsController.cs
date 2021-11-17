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
    [Route("seller-subscriptions")]
    public class SellerSubscriptionsController : Controller
    {
        readonly ISellerSubscriptionService service;

        public SellerSubscriptionsController(ISellerSubscriptionService _service)
        {
            this.service = _service;
        }

        [Route("get-paginated")]
        [HttpGet]
        public ActionResult<List<SellerSubscription>> GetSellerSubscriptionsPaginated(int offset, int limit)
        {
            List<SellerSubscription> sellerSubscriptions = service.GetSellerSubscriptionsPaginated(offset, limit);
            int count = service.getCount();
            return Ok(new { sellerSubscriptions, count });
        }

        [Route("get")]
        [HttpGet]
        public ActionResult<SellerSubscription> GetSellerSubscriptionById(string sellerId, string userId)
        {
            SellerSubscription sellerSubscription = service.GetSellerSubscriptionById(sellerId, userId);
            return Ok(sellerSubscription);
        }

        [Route("create")]
        [HttpPost]
        public ActionResult<SellerSubscription> CreateSellerSubscription([FromBody] SellerSubscriptionDTO data)
        {
            SellerSubscription res = service.CreateSellerSubscription(data);  
            return Ok(res);
        }

        [Route("delete")]
        [HttpDelete]
        public ActionResult DeleteSellerSubscription(string sellerId, string userId)
        {
            try
            {
                service.DeleteSellerSubscription(sellerId, userId);
                return Ok("Seller subscription deleted");
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [Route("update")]
        [HttpPost]
        public ActionResult UpdateSellerSubscription(string sellerId, string userId, [FromBody] SellerSubscriptionDTO data)
        {
            try
            {
                service.UpdateSellerSubscription(sellerId, userId, data);
                return Ok("Seller subscription updated");
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
    }
}
