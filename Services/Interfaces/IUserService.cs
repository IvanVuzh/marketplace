using MarketPlace5.Models.DTOs;
using MarketPlace5.Models.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace MarketPlace5.Services.Interfaces
{
    public interface IUserService
    {
        public List<User> GetUsersPaginated(int offset, int limit);
        public User GetUserById(string id);
        public void DeleteUser(string id);
        public void UpdateUser(string id, UserDTO newData);
        public User CreateUser(UserDTO data);
        public int getCount();

    }
}
