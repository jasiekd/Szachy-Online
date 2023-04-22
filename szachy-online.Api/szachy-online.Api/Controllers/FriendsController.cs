﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using szachy_online.Api.Data;
using szachy_online.Api.Entities;

namespace szachy_online.Api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class FriendsController : ControllerBase
    {
        private readonly DataContext _context;

        public FriendsController(DataContext context)
        {
            _context = context;
        }

        // GET: api/Friends
        [HttpGet]
        public async Task<ActionResult<IEnumerable<FriendsEntity>>> GetFriends()
        {
          if (_context.Friends == null)
          {
              return NotFound();
          }
            return await _context.Friends.ToListAsync();
        }

        // GET: api/Friends/5
        [HttpGet("{id}")]
        public async Task<ActionResult<FriendsEntity>> GetFriendsEntity(long id)
        {
          if (_context.Friends == null)
          {
              return NotFound();
          }
            var friendsEntity = await _context.Friends.FindAsync(id);

            if (friendsEntity == null)
            {
                return NotFound();
            }

            return friendsEntity;
        }

        [HttpGet("ForUser/{id}")]
        public async Task<ActionResult<IEnumerable<FriendsEntity>>> GetFriendsForAccount(Guid id)
        {
            if (_context.Friends == null)
            {
                return NotFound();
            }
            var friendsList = await _context.Friends.Where(v => v.User1ID == id || v.User2ID == id).ToListAsync();
            return friendsList;
        }

        // PUT: api/Friends/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutFriendsEntity(long id, FriendsEntity friendsEntity)
        {
            if (id != friendsEntity.FriendshipID)
            {
                return BadRequest();
            }

            _context.Entry(friendsEntity).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!FriendsEntityExists(id))
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

        // POST: api/Friends
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<FriendsEntity>> PostFriendsEntity(FriendsEntity friendsEntity)
        {
          if (_context.Friends == null)
          {
              return Problem("Entity set 'DataContext.Friends'  is null.");
          }
            _context.Friends.Add(friendsEntity);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetFriendsEntity", new { id = friendsEntity.FriendshipID }, friendsEntity);
        }

        // DELETE: api/Friends/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteFriendsEntity(long id)
        {
            if (_context.Friends == null)
            {
                return NotFound();
            }
            var friendsEntity = await _context.Friends.FindAsync(id);
            if (friendsEntity == null)
            {
                return NotFound();
            }

            _context.Friends.Remove(friendsEntity);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool FriendsEntityExists(long id)
        {
            return (_context.Friends?.Any(e => e.FriendshipID == id)).GetValueOrDefault();
        }
    }
}