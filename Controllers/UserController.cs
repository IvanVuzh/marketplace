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
    [Route("users")]
    public class UserController : Controller
    {
        readonly IUserService service;

        public UserController(IUserService _service)
        {
            this.service = _service;
        }

        [Route("get-paginated")]
        [HttpGet]
        public ActionResult<List<User>> GetUsersPaginated(int offset, int limit)
        {
            List<User> users = service.GetUsersPaginated(offset, limit);
            int count = service.getCount();
            return Ok(new { users, count });
        }

        [Route("get/{id}")]
        [HttpGet]
        public ActionResult<User> GetUserById(string id)
        {
            User user = service.GetUserById(id);
            return Ok(user);
        }

        [Route("create")]
        [HttpPost]
        public ActionResult<User> CreateUser([FromBody] UserDTO data)
        {
            if(ModelState.IsValid)
            {
                User res = service.CreateUser(data);
                return Ok(res);
            }
            else
            {
                return BadRequest();
            }
        }

        [Route("delete/{id}")]
        [HttpDelete]
        public ActionResult DeleteUser(string id)
        {
            try
            {
                service.DeleteUser(id);
                return Ok("User deleted");
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [Route("update/{id}")]
        [HttpPost]
        public ActionResult UpdateUser(string id, [FromBody] UserDTO data)
        {
            try
            {
                service.UpdateUser(id, data);
                return Ok("User updated");
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
    }
}
