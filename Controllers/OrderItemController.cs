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
    [Route("order-items")]
    public class OrderItemController : Controller
    {
        readonly IOrderItemService service;

        public OrderItemController(IOrderItemService _service)
        {
            this.service = _service;
        }

        [Route("get-paginated")]
        [HttpGet]
        public ActionResult<List<OrderItem>> GetOrderItemsPaginated(int offset, int limit)
        {
            List<OrderItem> orderItems = service.GetOrderItemsPaginated(offset, limit);
            int count = service.getCount();
            return Ok(new { orderItems, count });
        }

        [Route("get")]
        [HttpGet]
        public ActionResult<OrderItem> GetOrderItemById(string orderId, string productId)
        {
            OrderItem orderItem = service.GetOrderItemById(orderId, productId);
            return Ok(orderItem);
        }

        [Route("create")]
        [HttpPost]
        public ActionResult<OrderItem> CreateOrderItem([FromBody] OrderItemDTO data)
        {
            OrderItem res = service.CreateOrderItem(data);  
            return Ok(res);
        }

        [Route("delete")]
        [HttpDelete]
        public ActionResult DeleteOrderItem(string orderId, string productId)
        {
            try
            {
                service.DeleteOrderItem(orderId, productId);
                return Ok("Order item deleted");
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [Route("update")]
        [HttpPost]
        public ActionResult UpdateOrderItem(string orderId, string productId, [FromBody] OrderItemDTO data)
        {
            try
            {
                service.UpdateOrderItem(orderId, productId, data);
                return Ok("Order item updated");
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
    }
}
