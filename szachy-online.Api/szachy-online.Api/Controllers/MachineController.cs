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
    }
}
