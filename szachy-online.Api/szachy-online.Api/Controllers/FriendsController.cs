using System.Security.Claims;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using szachy_online.Api.Data;
using szachy_online.Api.Dto;
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
        [HttpGet("sendInvitation/{nickname}")]
        [Authorize]
        public async Task<IActionResult> SendInvitation(string nickname)
        {
            Guid userId = Guid.Parse(User.FindFirstValue(ClaimTypes.NameIdentifier));
            AccountEntity receiverAccountEntity = await _context.Accounts.FirstOrDefaultAsync(x => x.Nickname == nickname);

            if (FriendshipExists(userId, receiverAccountEntity.Id))
            {
                return BadRequest();
            }

            FriendsEntity friendsEntity = new FriendsEntity
            {
                FriendshipID = 0,
                User1ID = userId,
                User2ID = receiverAccountEntity.Id
            };

            _context.Friends.Add(friendsEntity);
            await _context.SaveChangesAsync();

            return Ok();
        }

        [HttpGet("GetListOfPendingInvitations")]
        [Authorize]
        public async Task<ActionResult<IEnumerable<FriendshipInfoDto>>> GetListOfPendingInvitations()
        {
            if (_context.Friends == null)
            {
                return NotFound();
            }
            Guid userId = Guid.Parse(User.FindFirstValue(ClaimTypes.NameIdentifier));

            var friendships = await _context.Friends
              .Where(x => (x.User2ID == userId && x.Status == StatusFriendship.Pending.ToString()))
              .Include(x => x.User1).Include(x => x.User2).Select(z => new FriendshipInfoDto
              {
                  FriendshipId = z.FriendshipID,
                  UserId1 = z.User1ID,
                  User1Name = z.User1.Name,
                  User1Surname = z.User1.Surname,
                  User1Nickname = z.User1.Nickname,
                  UserId2 = z.User2ID,
                  User2Name = z.User2.Name,
                  User2Surname = z.User2.Surname,
                  User2Nickname = z.User2.Nickname,
                  DateModified = z.DateModified,
              }).ToListAsync();

            return friendships;
        }

        [HttpGet("GetListOfMySentInvitations")]
        [Authorize]
        public async Task<ActionResult<IEnumerable<FriendshipInfoDto>>> GetListOfMySentInvitations()
        {
            if (_context.Friends == null)
            {
                return NotFound();
            }
            Guid userId = Guid.Parse(User.FindFirstValue(ClaimTypes.NameIdentifier));

            var friendships = await _context.Friends
              .Where(x => (x.User1ID == userId && x.Status == StatusFriendship.Pending.ToString()))
              .Include(x => x.User1).Include(x => x.User2).Select(z => new FriendshipInfoDto
              {
                  FriendshipId = z.FriendshipID,
                  UserId1 = z.User1ID,
                  User1Name = z.User1.Name,
                  User1Surname = z.User1.Surname,
                  User1Nickname = z.User1.Nickname,
                  UserId2 = z.User2ID,
                  User2Name = z.User2.Name,
                  User2Surname = z.User2.Surname,
                  User2Nickname = z.User2.Nickname,
                  DateModified = z.DateModified,
              }).ToListAsync();

            return friendships;
        }

        [HttpGet("GetListOfFriends")]
        [Authorize]
        public async Task<ActionResult<IEnumerable<FriendshipInfoDto>>> GetListOfFriends()
        {
            if (_context.Friends == null)
            {
                return NotFound();
            }
            Guid userId = Guid.Parse(User.FindFirstValue(ClaimTypes.NameIdentifier));

            var friendships = await _context.Friends
              .Where(x => (x.User2ID == userId && x.Status == StatusFriendship.Accept.ToString()) ||
                (x.User1ID == userId && x.Status == StatusFriendship.Accept.ToString())).Include(x => x.User1).Include(x => x.User2).Select(z => new FriendshipInfoDto
                {
                    FriendshipId = z.FriendshipID,
                    UserId1 = z.User1ID,
                    User1Name = z.User1.Name,
                    User1Surname = z.User1.Surname,
                    User1Nickname = z.User1.Nickname,
                    UserId2 = z.User2ID,
                    User2Name = z.User2.Name,
                    User2Surname = z.User2.Surname,
                    User2Nickname = z.User2.Nickname,
                    DateModified = z.DateModified,
                }).ToListAsync();

            return friendships;
        }

        [HttpGet("acceptInvitation/{friendshipID}")]
        [Authorize]
        public async Task<IActionResult> AcceptInvitation(long friendshipID)
        {
            if (_context.Friends == null)
            {
                return NotFound();
            }
            Guid userId = Guid.Parse(User.FindFirstValue(ClaimTypes.NameIdentifier));
            FriendsEntity friendsEntity = await _context.Friends.FindAsync(friendshipID);

            if (friendsEntity == null)
            {
                return NotFound();
            }

            if (friendsEntity.User2ID != userId)
            {
                return Unauthorized();
            }

            friendsEntity.Status = StatusFriendship.Accept.ToString();
            friendsEntity.DateModified = DateTime.Now;

            _context.Friends.Update(friendsEntity);
            await _context.SaveChangesAsync();

            return Ok();
        }

        // DELETE: api/Friends/5
        [HttpDelete("removeFriend/{friendshipID}")]
        [Authorize]
        public async Task<IActionResult> RemoveFriend(long friendshipID)
        {
            if (_context.Friends == null)
            {
                return NotFound();
            }
            var friendsEntity = await _context.Friends.FindAsync(friendshipID);
            if (friendsEntity == null)
            {
                return NotFound();
            }

            Guid userId = Guid.Parse(User.FindFirstValue(ClaimTypes.NameIdentifier));

            if (friendsEntity.User1ID != userId)
            {
                if (friendsEntity.User2ID != userId)
                {
                    return Unauthorized();
                }
            }

            _context.Friends.Remove(friendsEntity);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool FriendshipExists(Guid senderId, Guid receiverId)
        {
            return (_context.Friends?.Any(e => (e.User1ID == senderId && e.User2ID == receiverId) || (e.User1ID == receiverId && e.User2ID == senderId))).GetValueOrDefault();
        }
    }
}