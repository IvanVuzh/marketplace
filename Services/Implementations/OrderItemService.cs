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
    public class OrderItemService : IOrderItemService
    {
        readonly MarketPlaceDBContext db;
        public OrderItemService(MarketPlaceDBContext db)
        {
            this.db = db;
        }

        public OrderItem CreateOrderItem(OrderItemDTO data)
        {
            var res = new OrderItem()
            {
                ProductId = data.ProductId,
                Amount = data.Amount,
                OrderId = data.OrderId,
                Price = data.Price,
                Product = db.Products.FirstOrDefault(p => p.Id == data.ProductId),
                Order = db.Orders.FirstOrDefault(p => p.Id == data.OrderId),
            };
            db.OrderItems.Add(res);
            db.SaveChanges();
            return res;
        }

        public void DeleteOrderItem(string orderId, string productId)
        {
            OrderItem orderItem = db.OrderItems.FirstOrDefault(p => (p.OrderId == orderId && p.ProductId == productId));
            db.OrderItems.Remove(orderItem);
            db.SaveChanges();
        }

        public OrderItem GetOrderItemById(string orderId, string productId)
        {
            return db.OrderItems
                .Include(p => p.Product)
                .Include(p => p.Order)
                .FirstOrDefault(p => (p.OrderId == orderId && p.ProductId == productId));
        }

        public List<OrderItem> GetOrderItemsPaginated(int offset, int limit)
        {
            return db.OrderItems
                .AsNoTracking()
                .Skip(offset * limit)
                .Take(limit)
                .Include(p => p.Order)
                .Include(p => p.Product)
                .ToList();
        }

        public void UpdateOrderItem(string orderId, string productId, OrderItemDTO newData)
        {
            var orderItem = db.OrderItems.FirstOrDefault(p => (p.OrderId == orderId && p.ProductId == productId));
            db.Entry(orderItem).CurrentValues.SetValues(newData);
            db.SaveChanges();
        }

        public int getCount()
        {
            return db.OrderItems.Count();
        }
    }
}
