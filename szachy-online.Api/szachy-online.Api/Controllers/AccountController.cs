using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using NuGet.Protocol.Plugins;
using System.Security.Claims;
using System.Security.Cryptography;
using System.Text;
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
        [HttpGet]
        [Authorize]
        public async Task<ActionResult<IEnumerable<AccountEntity>>> GetAccounts()
        {
            if (_context.Accounts == null)
            {
                return NotFound();
            }
            return await _context.Accounts.ToListAsync();
        }

        [HttpGet("getUser/{id}")]
        public async Task<ActionResult<AccountEntity>> GetAccountEntity(Guid id)
        {
            
            if (_context.Accounts == null)
            {
                return NotFound();
            }
            var accountEntity = await _context.Accounts.FindAsync(id);

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

            AccountEntity accountEntity =  await _context.Accounts.FindAsync(userId);

            UserInfoDto temp = new UserInfoDto { 
                Name = accountEntity.Name,
                Surname = accountEntity.Surname,
                Nickname = accountEntity.Nickname,
            };

            return Ok(temp);
        }

        [HttpPost("findByNickname")]
        public async Task<ActionResult<IEnumerable<UserInfoDto>>> FindByNickname(string nickname)
        {

            if (string.IsNullOrEmpty(nickname) || nickname.Length <= 1)
            {
                return BadRequest("Nickname must be longer than 2 characters.");
            }


            var ListOfFoundNicknames = await _context.Accounts.Where(x => x.Nickname.Contains(nickname)).ToListAsync();
            if(ListOfFoundNicknames.Count == 0)
            {
                return NotFound("No accounts found with the provided nickname.");
            }
            
            List<UserInfoDto> nicknames = new List<UserInfoDto>();
            foreach(var account in ListOfFoundNicknames)
            {
                if(!account.Id.Equals(Guid.Parse("3264FF97-928E-4EFF-BE63-69F21D204067")) && !account.Id.Equals(Guid.Parse("2ACE6DC4-7FEA-46B3-90F4-1839341A86AF")) && !account.Id.Equals(Guid.Parse("958E78FB-5E6B-4822-9F04-8A4A19D15257")))
                {
                    nicknames.Add(new UserInfoDto
                    {
                        Name = account.Name,
                        Surname = account.Surname,
                        Nickname = account.Nickname,
                    }
                );
                }
                 
            }

            return Ok(nicknames);
        }

        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutAccountEntity(Guid id, AccountEntity accountEntity)
        {
            if (id != accountEntity.Id)
            {
                return BadRequest();
            }

            _context.Entry(accountEntity).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!AccountEntityExists(id))
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

        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
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
                Nickname= registerInfo.Nickname,
                Password = _accountService.HashPassword(registerInfo.Password)
            };

            if (LoginEmailNicknameExists(accountEntity.Email, accountEntity.Login, accountEntity.Nickname))
                return Problem("Account with that email or login or nickname already exist");
            _context.Accounts.Add(accountEntity);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetAccountEntity", new { id = accountEntity.Id }, accountEntity);
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteAccountEntity(Guid id)
        {
            if (_context.Accounts == null)
            {
                return NotFound();
            }
            var accountEntity = await _context.Accounts.FindAsync(id);
            if (accountEntity == null)
            {
                return NotFound();
            }

            _context.Accounts.Remove(accountEntity);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool AccountEntityExists(Guid id)
        {
            return (_context.Accounts?.Any(e => e.Id == id)).GetValueOrDefault();
        }

        private bool LoginEmailNicknameExists(string email, string login, string nickname) 
        {
            return (_context.Accounts?.Any(e => e.Email == email || e.Login==login || e.Nickname==nickname)).GetValueOrDefault();
        }
        private bool NicknameExists(string nickname)
        {
            return (_context.Accounts?.Any(e => e.Nickname == nickname)).GetValueOrDefault();
        }
    }
}

