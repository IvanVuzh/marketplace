using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using MarketPlace5.Models;
using MarketPlace5.Models.DTOs;
using MarketPlace5.Models.Entities;
using MarketPlace5.Services.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace MarketPlace5.Services.Implementations
{
    public class OrderService : IOrderService
    {

        readonly MarketPlaceDBContext db;
        public OrderService(MarketPlaceDBContext db)
        {
            this.db = db;
        }

        public Order CreateOrder(OrderDTO data)
        {
            var res = new Order()
            {
                Id = Guid.NewGuid().ToString(),
                BuyerId = data.BuyerId,
                Buyer = db.Users.FirstOrDefault(p => p.Id == data.BuyerId),
            };
            db.Orders.Add(res);
            db.SaveChanges();
            return res;
        }

        public void DeleteOrder(string id)
        {
            Order order = db.Orders.FirstOrDefault(p => p.Id == id);
            db.Orders.Remove(order);
            db.SaveChanges();
        }

        public Order GetOrderById(string id)
        {
            return db.Orders
                .Include(p => p.Buyer)
                .FirstOrDefault(p => p.Id == id);
        }

        public List<Order> GetOrdersPaginated(int offset, int limit)
        {
            return db.Orders
                .AsNoTracking()
                .Skip(offset * limit)
                .Take(limit)
                .Include(p => p.Buyer)
                .ToList();
        }

        public void UpdateOrder(string id, OrderDTO newData)
        {
            var order = db.Orders.FirstOrDefault(p => p.Id == id);
            db.Entry(order).CurrentValues.SetValues(newData);
            db.SaveChanges();
        }

        public int getCount()
        {
            return db.Orders.Count();
        }
    }
}
