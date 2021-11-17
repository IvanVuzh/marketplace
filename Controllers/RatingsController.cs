using MarketPlace5.Models.DTOs;
using MarketPlace5.Models.Entities;
using MarketPlace5.Services.Interfaces;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;

namespace MarketPlace5.Controllers
{
    public class RatingsController : Controller
    {
        readonly IRatingService service;

        public RatingsController(IRatingService _service)
        {
            this.service = _service;
        }

        [Route("get-seller-rating/{id}")]
        [HttpGet]
        public ActionResult<double> GetSellerRating(string id)
        {
            double rating = service.GetRatingsForSeller(id);
            return Ok(rating);
        }

        [Route("create")]
        [HttpPost]
        public ActionResult<Ratings> CreateRating([FromBody] RatingsDTO data)
        {
            Ratings res = service.CreateRating(data);
            return Ok(res);
        }

        [Route("delete")]
        [HttpDelete]
        public ActionResult DeleteRating(string sellerId, string userId)
        {
            try
            {
                service.DeleteRatings(sellerId, userId);
                return Ok("Rating deleted");
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [Route("update")]
        [HttpPost]
        public ActionResult UpdateRatings([FromBody] RatingsDTO data)
        {
            try
            {
                service.UpdateRatings(data);
                return Ok("Rating updated");
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
    }
}
}
