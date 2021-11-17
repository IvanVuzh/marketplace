using MarketPlace5.Models.Entities;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace MarketPlace5.Models
{
    public class MarketPlaceDBContext : DbContext
    {
        public MarketPlaceDBContext() { }
        public MarketPlaceDBContext(DbContextOptions<MarketPlaceDBContext> options) : base(options) { }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);
            modelBuilder.Entity<CategoriesSubscription>()
                .HasKey(o => new { o.CategoryId, o.SellerId });
            modelBuilder.Entity<OrderItem>()
                .HasKey(o => new { o.OrderId, o.ProductId });
            modelBuilder.Entity<SellerSubscription>()
                .HasKey(o => new { o.SellerId, o.UserId });
            modelBuilder.Entity<Ratings>()
                .HasKey(o => new { o.SellerId, o.UserId });
        }
        public DbSet<User> Users { get; set; }
        public DbSet<CategoriesSubscription> CategoriesSubscriptions { get; set; }
        public DbSet<Category> Categories { get; set; }
        public DbSet<Product> Products { get; set; }
        public DbSet<Order> Orders { get; set; }
        public DbSet<OrderItem> OrderItems { get; set; }
        public DbSet<Comment> Comments { get; set; }
        public DbSet<SellerSubscription> SellerSubscriptions { get; set; }
        public DbSet<Ratings> Ratings{ get; set; }

    }
}
