using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Security.Claims;
using szachy_online.Api.Data;
using szachy_online.Api.Dto;
using szachy_online.Api.Entities;
using szachy_online.Api.Services;

namespace szachy_online.Api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AccountController : ControllerBase
    {
        private readonly AccountService _accountService;
        private readonly DataContext _context;

        public AccountController(AccountService accountService, DataContext context)
        {
            _accountService = accountService;
            _context = context;
        }

        [HttpPost("login")]
        [AllowAnonymous]
        public IActionResult LoginUser([FromBody] UserLoginRequestDto loginData)
        {
            var result = _accountService.LoginUser(loginData);
            if (result == null)
                return Unauthorized();
            else
                return Ok(result);
        }

        [HttpGet("getUser/{requestUserID}")]
        [Authorize]
        public async Task<ActionResult<AccountEntity>> GetAccountEntity(Guid requestUserID)
        {

            if (_context.Accounts == null)
            {
                return NotFound();
            }
            var accountEntity = await _context.Accounts.FindAsync(requestUserID);

            if (accountEntity == null)
            {
                return NotFound();
            }
            UserInfoDto temp = new UserInfoDto
            {
                Name = accountEntity.Name,
                Surname = accountEntity.Surname,
                Nickname = accountEntity.Nickname,
            };

            return Ok(temp);
        }
        [HttpGet("getUser")]
        [Authorize]
        public async Task<IActionResult> GetAccount()
        {
            Guid userId = Guid.Parse(User.FindFirstValue(ClaimTypes.NameIdentifier));

            AccountEntity accountEntity = await _context.Accounts.FindAsync(userId);

            UserInfoDto temp = new UserInfoDto
            {
                Name = accountEntity.Name,
                Surname = accountEntity.Surname,
                Nickname = accountEntity.Nickname,
            };

            return Ok(temp);
        }

        [HttpPost("findByNickname")]
        [Authorize]
        public async Task<ActionResult<IEnumerable<UserInfoDto>>> FindByNickname(string nickname)
        {

            if (string.IsNullOrEmpty(nickname) || nickname.Length <= 1)
            {
                return BadRequest("Nickname must be longer than 2 characters.");
            }

            var ListOfFoundNicknames = await _context.Accounts.Where(x => x.Nickname.Contains(nickname)).ToListAsync();
            if (ListOfFoundNicknames.Count == 0)
            {
                return NotFound("No accounts found with the provided nickname.");
            }

            List<UserInfoDto> nicknames = new List<UserInfoDto>();
            foreach (var account in ListOfFoundNicknames)
            {
                if (!account.Id.Equals(Guid.Parse("3264FF97-928E-4EFF-BE63-69F21D204067")) && !account.Id.Equals(Guid.Parse("2ACE6DC4-7FEA-46B3-90F4-1839341A86AF")) && !account.Id.Equals(Guid.Parse("958E78FB-5E6B-4822-9F04-8A4A19D15257")))
                {
                    nicknames.Add(new UserInfoDto
                    {
                        Name = account.Name,
                        Surname = account.Surname,
                        Nickname = account.Nickname,
                    });
                }

            }

            return Ok(nicknames);
        }

        [HttpGet("GetMyHistory")]
        [Authorize]
        public async Task<IActionResult> GetMyHistory()
        {
            Guid userId = Guid.Parse(User.FindFirstValue(ClaimTypes.NameIdentifier));

            var gameEntity = await _context.Games.Include(x => x.WhitePlayer).Include(x => x.BlackPlayer).Where(x => x.Winner != null).Where(x => (x.BlackPlayerID.Equals(userId)) || (x.WhitePlayerID.Equals(userId))).OrderByDescending(x => x.DateStarted).ToListAsync();

            var response = new List<object>();

            foreach (var temp in gameEntity)
            {
                response.Add(new
                {
                    GameID = temp.GameID,
                    WhiteID = temp.WhitePlayer.Id,
                    WhiteNickname = temp.WhitePlayer.Nickname,
                    BlackID = temp.BlackPlayer.Id,
                    BlackNickname = temp.BlackPlayer.Nickname,
                    Date = temp.DateStarted
                });
            }
            return Ok(response);
        }

        [HttpGet("GetMyFriendHistory/{idFriend}")]
        [Authorize]
        public async Task<IActionResult> GetMyFriendHistory(Guid idFriend)
        {

            var gameEntity = await _context.Games.Include(x => x.WhitePlayer).Include(x => x.BlackPlayer).Where(x => x.Winner != null).Where(x => (x.BlackPlayerID.Equals(idFriend)) || (x.WhitePlayerID.Equals(idFriend))).OrderByDescending(x=>x.DateStarted).ToListAsync();

            var response = new List<object>();

            foreach (var temp in gameEntity)
            {
                response.Add(new
                {
                    GameID = temp.GameID,
                    WhiteID = temp.WhitePlayer.Id,
                    WhiteNickname = temp.WhitePlayer.Nickname,
                    BlackID = temp.BlackPlayer.Id,
                    BlackNickname = temp.BlackPlayer.Nickname,
                    Date = temp.DateStarted
                });
            }
            return Ok(response);
        }

        [HttpPost("register")]
        [AllowAnonymous]
        public async Task<ActionResult<RegisterInfoDto>> PostAccountEntity(RegisterInfoDto registerInfo)
        {
            if (_context.Accounts == null)
            {
                return Problem("Entity set 'DataContext.Accounts'  is null.");
            }

            AccountEntity accountEntity = new AccountEntity
            {
                Id = Guid.NewGuid(),
                Name = registerInfo.Name,
                Surname = registerInfo.Surname,
                Login = registerInfo.Login,
                Email = registerInfo.Email,
                Nickname = registerInfo.Nickname,
                Password = _accountService.HashPassword(registerInfo.Password)
            };

            if (LoginEmailNicknameExists(accountEntity.Email, accountEntity.Login, accountEntity.Nickname))
                return Problem("Account with that email or login or nickname already exist");
            _context.Accounts.Add(accountEntity);
            await _context.SaveChangesAsync();

            return CreatedAtAction("PostAccountEntity", new
            {
                id = accountEntity.Id
            }, accountEntity);
        }

        private bool LoginEmailNicknameExists(string email, string login, string nickname)
        {
            return (_context.Accounts?.Any(e => e.Email == email || e.Login == login || e.Nickname == nickname)).GetValueOrDefault();
        }
    }
}