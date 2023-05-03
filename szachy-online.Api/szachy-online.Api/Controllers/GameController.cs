using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.SignalR;
using System.Security.Claims;
using szachy_online.Api.Data;
using szachy_online.Api.Dto;
using szachy_online.Api.Entities;
using szachy_online.Api.Hubs;
using szachy_online.Api.Services;

namespace szachy_online.Api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
        public class GameController : ControllerBase
        {
        private readonly AccountService _accountService;
        private readonly DataContext _context;
        private readonly IHubContext<ChessHub> _hubContext;

        public GameController(AccountService accountService, DataContext context, IHubContext<ChessHub> hubContext)
        {
            _accountService = accountService;
            _context = context;
            _hubContext = hubContext;
        }

        [HttpGet("Move/{gid}/{move}")]
        public async Task<IActionResult> Move(Guid gid, string move)
        {
            var gameEntity = await _context.Games.FindAsync(gid);
            if(gameEntity.PGN == null)  
                gameEntity.PGN = move; 
            else 
                gameEntity.PGN += move;
            _context.Games.Update(gameEntity);
            _context.SaveChanges();

            //przeliczenie pozycji na podstawie bazy



            string computerMove = "e5";

            gameEntity.PGN += " e5";

            _context.Games.Update(gameEntity);
            _context.SaveChanges();
            // Ten receivecomputermove musi sie nazywac tak samo zeby sie polaczyc
            await _hubContext.Clients.All.SendAsync("ReceiveComputerMove", computerMove);

            return Ok();
        }

        [HttpGet("CreateGameWithComputer")]
        public async Task<IActionResult> CreateGameWithComputer()
        {
            GameEntity temp = new GameEntity { 
                GameID= Guid.NewGuid(),
                WhitePlayer = Guid.NewGuid(),
                BlackPlayer= Guid.NewGuid(),
                DateStarted= DateTime.Now,
            };

            _context.Games.Add(temp);
            await _context.SaveChangesAsync();

            GameIdDto tmp = new GameIdDto { GameID = temp.GameID.ToString() };

            return Ok(tmp);
        }
    }
}
