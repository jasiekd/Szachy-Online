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

        // GET: api/OpeningEntities
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

        // GET: api/OpeningEntities/5
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

        // PUT: api/OpeningEntities/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        [Authorize]
        public async Task<IActionResult> PutOpeningEntity(int id, OpeningEntity openingEntity)
        {
            if (id != openingEntity.Id)
            {
                return BadRequest();
            }

            _context.Entry(openingEntity).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!OpeningEntityExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        // POST: api/OpeningEntities
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        [Authorize]
        public async Task<ActionResult<OpeningEntity>> PostOpening(OpeningEntity openingEntity)
        {
          if (_context.Openings == null)
          {
              return Problem("Entity set 'DataContext.Openings'  is null.");
          }
            _context.Openings.Add(openingEntity);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetOpeningEntity", new { id = openingEntity.Id }, openingEntity);
        }

        // DELETE: api/OpeningEntities/5
        [HttpDelete("{id}")]
        [Authorize]
        public async Task<IActionResult> DeleteOpening(int id)
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

            _context.Openings.Remove(openingEntity);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool OpeningEntityExists(int id)
        {
            return (_context.Openings?.Any(e => e.Id == id)).GetValueOrDefault();
        }
    }
}
