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
    public class OpeningController : ControllerBase
    {
        private readonly DataContext _context;

        public OpeningController(DataContext context)
        {
            _context = context;
        }

        [HttpGet("GetOpenings")]
        [Authorize]
        public async Task<ActionResult<IEnumerable<OpeningEntity>>> GetOpenings()
        {
          if (_context.Openings == null)
          {
              return NotFound();
          }
            return await _context.Openings.ToListAsync();
        }

        [HttpPost("GetOpening")]
        [Authorize]
        public async Task<ActionResult<OpeningEntity>> GetOpening(int id)
        {
          if (_context.Openings == null)
          {
              return NotFound();
          }
            var openingEntity = await _context.Openings.FindAsync(id);

            if (openingEntity == null)
            {
                return NotFound();
            }

            return openingEntity;
        }
    }
}
