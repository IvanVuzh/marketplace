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
    [Route("comments")]
    public class CommentController : Controller
    {
        readonly ICommentService service;

        public CommentController(ICommentService _service)
        {
            this.service = _service;
        }

        [Route("get-paginated")]
        [HttpGet]
        public ActionResult<List<Comment>> GetCommentsPaginated(int offset, int limit, string productId)
        {
            List<Comment> comments = service.GetCommentsPaginated(offset, limit, productId);
            int count = service.getCount();
            return Ok(new { comments, count });
        }

        [Route("get/{id}")]
        [HttpGet]
        public ActionResult<Comment> GetCommentById(string id)
        {
            Comment comment = service.GetCommentById(id);
            return Ok(comment);
        }

        [Route("create")]
        [HttpPost]
        public ActionResult<Comment> CreateComment([FromBody] CommentDTO data)
        {
            Comment res = service.CreateComment(data);  
            return Ok(res);
        }

        [Route("delete/{id}")]
        [HttpDelete]
        public ActionResult DeleteComment(string id)
        {
            try
            {
                service.DeleteComment(id);
                return Ok("Comment deleted");
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [Route("update/{id}")]
        [HttpPost]
        public ActionResult UpdateComment(string id, [FromBody] CommentDTO data)
        {
            try
            {
                service.UpdateComment(id, data);
                return Ok("Comment updated");
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
    }
}
