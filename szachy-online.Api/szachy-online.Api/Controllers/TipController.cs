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

        [HttpGet("GetTips")]
        public async Task<ActionResult<IEnumerable<TipEntity>>> GetTips()
        {
          if (_context.Tips == null)
          {
              return NotFound();
          }
            return await _context.Tips.ToListAsync();
        }

        // GET: api/Tip/5
        [HttpPost("GetTip")]
        public async Task<ActionResult<TipEntity>> GetTip(int id)
        {
          if (_context.Tips == null)
          {
              return NotFound();
          }
            var tipEntity = await _context.Tips.FindAsync(id);

            if (tipEntity == null)
            {
                return NotFound();
            }

            return tipEntity;
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

        // PUT: api/Tip/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutTipEntity(int id, TipEntity tipEntity)
        {
            if (id != tipEntity.Id)
            {
                return BadRequest();
            }

            _context.Entry(tipEntity).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!TipEntityExists(id))
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

        // POST: api/Tip
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<TipEntity>> PostTipEntity(TipEntity tipEntity)
        {
          if (_context.Tips == null)
          {
              return Problem("Entity set 'DataContext.Tips'  is null.");
          }
            _context.Tips.Add(tipEntity);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetTipEntity", new { id = tipEntity.Id }, tipEntity);
        }

        // DELETE: api/Tip/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteTipEntity(int id)
        {
            if (_context.Tips == null)
            {
                return NotFound();
            }
            var tipEntity = await _context.Tips.FindAsync(id);
            if (tipEntity == null)
            {
                return NotFound();
            }

            _context.Tips.Remove(tipEntity);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool TipEntityExists(int id)
        {
            return (_context.Tips?.Any(e => e.Id == id)).GetValueOrDefault();
        }
    }
}
