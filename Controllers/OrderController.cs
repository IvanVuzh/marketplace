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
    [Route("orders")]
    public class OrderController : Controller
    {
        readonly IOrderService service;

        public OrderController(IOrderService _service)
        {
            this.service = _service;
        }

        [Route("get-paginated")]
        [HttpGet]
        public ActionResult<List<Order>> GetOrdersPaginated(int offset, int limit)
        {
            List<Order> orders = service.GetOrdersPaginated(offset, limit);
            int count = service.getCount();
            return Ok(new { orders, count });
        }

        [Route("get/{id}")]
        [HttpGet]
        public ActionResult<Order> GetOrderById(string id)
        {
            Order order = service.GetOrderById(id);
            return Ok(order);
        }

        [Route("create")]
        [HttpPost]
        public ActionResult<Order> CreateOrder([FromBody] OrderDTO data)
        {
            Order res = service.CreateOrder(data);  
            return Ok(res);
        }

        [Route("delete/{id}")]
        [HttpDelete]
        public ActionResult DeleteOrder(string id)
        {
            try
            {
                service.DeleteOrder(id);
                return Ok("Order deleted");
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [Route("update/{id}")]
        [HttpPost]
        public ActionResult UpdateOrder(string id, [FromBody] OrderDTO data)
        {
            try
            {
                service.UpdateOrder(id, data);
                return Ok("Order updated");
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
    }
}
