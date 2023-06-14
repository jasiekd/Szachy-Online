using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using szachy_online.Api.Data;
using szachy_online.Api.Entities;

namespace szachy_online.Api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class TipController : ControllerBase
    {
        private readonly DataContext _context;

        public TipController(DataContext context)
        {
            _context = context;
        }

        [HttpPost("GetRandomTip")]
        [AllowAnonymous]
        public async Task<ActionResult<TipEntity>> GetRandomTip()
        {
            if (_context.Tips == null)
            {
                return NotFound();
            }
            var listOfTips = await _context.Tips.ToListAsync();
            Random random = new Random();

            return listOfTips.ElementAt(random.Next(listOfTips.Count));
        }
    }
}
