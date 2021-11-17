using MarketPlace5.Models;
using MarketPlace5.Models.DTOs;
using MarketPlace5.Models.Entities;
using MarketPlace5.Services.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;

namespace MarketPlace5.Services.Implementations
{

    public class UserService : IUserService
    {
        readonly MarketPlaceDBContext db;
        public UserService(MarketPlaceDBContext db)
        {
            this.db = db;
        }
        public User CreateUser(UserDTO data)
        {
            var res = new User()
            {
                Id = Guid.NewGuid().ToString(),
                DisplayName = data.DisplayName,
                Email = data.Email,
                LoginName = data.LoginName,
                Password = UtilityService.GetPasswordHash(data.Password),
                Rating = data.Rating,
                Role = data.Role
            };
            db.Users.Add(res);
            db.SaveChanges();
            return res;
        }

        public void DeleteUser(string id)
        {
            User user = db.Users.Find(id);
            db.Users.Remove(user);
            db.SaveChanges();
        }

        public User GetUserById(string id)
        {
            return db.Users.FirstOrDefault(p => p.Id == id);
        }

        public List<User> GetUsersPaginated(int offset, int limit)
        {
            return db.Users.AsNoTracking().Skip(offset * limit).Take(limit).ToList();
        }

        public void UpdateUser(string id, UserDTO newData)
        {
            var user = db.Users.FirstOrDefault(p => p.Id == id);
            db.Entry(user).CurrentValues.SetValues(newData);
            user.Password = UtilityService.GetPasswordHash(newData.Password);
            db.Update(user);
            db.SaveChanges();
        }
        public int getCount()
        {
            return db.Users.Count();
        }
    }
}
