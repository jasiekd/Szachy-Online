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
    public class MachineController : ControllerBase
    {
        private readonly DataContext _context;

        public MachineController(DataContext context)
        {
            _context = context;
        }

        [HttpGet("GetMachines")]
        [Authorize]
        public async Task<ActionResult<IEnumerable<MachineEntity>>> GetMachines()
        {
          if (_context.Machines == null)
          {
              return NotFound();
          }
            return await _context.Machines.ToListAsync();
        }

        [HttpGet("{id}")]
        [Authorize]
        public async Task<ActionResult<MachineEntity>> GetMachineEntity(Guid id)
        {
          if (_context.Machines == null)
          {
              return NotFound();
          }
            var machineEntity = await _context.Machines.FindAsync(id);

            if (machineEntity == null)
            {
                return NotFound();
            }

            return machineEntity;
        }

        [HttpPut("{id}")]
        [Authorize]
        public async Task<IActionResult> PutMachineEntity(Guid id, MachineEntity machineEntity)
        {
            if (id != machineEntity.Id)
            {
                return BadRequest();
            }

            _context.Entry(machineEntity).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!MachineEntityExists(id))
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

        [HttpPost]
        [Authorize]
        public async Task<ActionResult<MachineEntity>> PostMachineEntity(MachineEntity machineEntity)
        {
          if (_context.Machines == null)
          {
              return Problem("Entity set 'DataContext.Machines'  is null.");
          }
            _context.Machines.Add(machineEntity);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetMachineEntity", new { id = machineEntity.Id }, machineEntity);
        }

        [HttpDelete("{id}")]
        [Authorize]
        public async Task<IActionResult> DeleteMachineEntity(Guid id)
        {
            if (_context.Machines == null)
            {
                return NotFound();
            }
            var machineEntity = await _context.Machines.FindAsync(id);
            if (machineEntity == null)
            {
                return NotFound();
            }

            _context.Machines.Remove(machineEntity);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool MachineEntityExists(Guid id)
        {
            return (_context.Machines?.Any(e => e.Id == id)).GetValueOrDefault();
        }
    }
}
