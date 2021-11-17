using MarketPlace5.Models.DTOs;
using MarketPlace5.Models.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace MarketPlace5.Services.Interfaces
{
    public interface IOrderItemService
    {
        public List<OrderItem> GetOrderItemsPaginated(int offset, int limit);
        public OrderItem GetOrderItemById(string orderId, string productId);
        public void DeleteOrderItem(string orderId, string productId);
        public void UpdateOrderItem(string orderId, string productId, OrderItemDTO newData);
        public OrderItem CreateOrderItem(OrderItemDTO data);
        public int getCount();

    }
}
