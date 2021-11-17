using MarketPlace5.Models.DTOs;
using MarketPlace5.Models.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace MarketPlace5.Services.Interfaces
{
    public interface IOrderService
    {
        public List<Order> GetOrdersPaginated(int offset, int limit);
        public Order GetOrderById(string id);
        public void DeleteOrder(string id);
        public void UpdateOrder(string id, OrderDTO newData);
        public Order CreateOrder(OrderDTO data);
        public int getCount();

    }
}
