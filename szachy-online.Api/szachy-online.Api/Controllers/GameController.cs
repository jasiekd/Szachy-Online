using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Razor.Infrastructure;
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
        private readonly IHubContext<InvitationHub> _invHubContext;
        private readonly InvitationHub _invitationHub;
        public GameController(AccountService accountService, DataContext context, IHubContext<ChessHub> hubContext, IHubContext<InvitationHub> invHubContext, InvitationHub invitationHub)
        {
            _accountService = accountService;
            _context = context;
            _hubContext = hubContext;
            _invHubContext = invHubContext;
            _invitationHub = invitationHub;
        }

        [HttpGet("ComputerMove/{gid}/{move}")]
        public async Task<IActionResult> ComputerMove(Guid gid, string move)
        {
            var gameEntity = await _context.Games.FindAsync(gid);

            if (gameEntity.PGN == null)
                gameEntity.PGN = "1. " + move; // Rozpoczynamy numerację ruchów od 1
            else
            {
                var moves = gameEntity.PGN.Split(' ').ToList();
                var lastMove = moves.LastOrDefault();
                if (lastMove != null && lastMove.Contains("."))
                {
                    // Pobieramy ostatni numer ruchu i zwiększamy go o 1
                    var lastMoveNumber = int.Parse(lastMove.Split('.')[0]);
                    var newMoveNumber = lastMoveNumber + 1;
                    move = newMoveNumber + ". " + move;
                }
                gameEntity.PGN += " " + move;
            }

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

        [HttpGet("PlayerMove/{gid}/{move}")]
        public async Task<IActionResult> PlayerMove(Guid gid, string move)
        {
            Guid userId = Guid.Parse(User.FindFirstValue(ClaimTypes.NameIdentifier));

            var gameEntity = await _context.Games.FindAsync(gid);
            if (gameEntity.PGN == null)
                gameEntity.PGN = "1. " + move; // Rozpoczynamy numerację ruchów od 1
            else
            {
                var moves = gameEntity.PGN.Split(' ').ToList();
                var lastMove = moves.LastOrDefault();
                if (lastMove != null && lastMove.Contains("."))
                {
                    // Pobieramy ostatni numer ruchu i zwiększamy go o 1
                    var lastMoveNumber = int.Parse(lastMove.Split('.')[0]);
                    var newMoveNumber = lastMoveNumber + 1;
                    move = newMoveNumber + ". " + move;
                }
                gameEntity.PGN += " " + move;
            }

            _context.Games.Update(gameEntity);
            _context.SaveChanges();

            if(gameEntity.WhitePlayer == userId)
            {
                await _hubContext.Clients.All.SendAsync(gameEntity.BlackPlayer.ToString(), move);
            }
            else 
            {
                await _hubContext.Clients.All.SendAsync(gameEntity.WhitePlayer.ToString(), move);
            }
           
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


        [HttpPost("CreateGameOnlineWithPlayer")]
        public async Task<IActionResult> CreateGameOnlineWithPlayer(Guid guid, string color)
        {
            _invitationHub.StopCountdown();

            Guid userId = Guid.Parse(User.FindFirstValue(ClaimTypes.NameIdentifier));

            GameEntity temp = new GameEntity
            {
                GameID = Guid.NewGuid(),
                WhitePlayer = Guid.NewGuid(),
                BlackPlayer = Guid.NewGuid(),
                DateStarted = DateTime.Now,

            };

            if (color=="Random")
            {
                Random random = new Random();
                int randomNumber = random.Next(2);
                color = (randomNumber == 0) ? "Black" : "White";
            }
            if (color == "White")
            {
                temp.WhitePlayer = guid;
                temp.BlackPlayer = userId;
            }
            else if (color == "Black")
            {
                temp.BlackPlayer = guid;
                temp.WhitePlayer = userId;
            }

            _context.Games.Add(temp);
            await _context.SaveChangesAsync();

            await _hubContext.Clients.All.SendAsync(guid.ToString(), temp.GameID);
            await _hubContext.Clients.All.SendAsync(userId.ToString(), temp.GameID);

            return Ok();
        }


        [HttpPost("Forfeit")]
        public async Task<IActionResult> Forfeit(Guid guid)
        {
            Guid userId = Guid.Parse(User.FindFirstValue(ClaimTypes.NameIdentifier));
            var gameEntity = await _context.Games.FindAsync(guid);
            if( gameEntity.WhitePlayer == userId)
            {
                gameEntity.Winner = "Black";
                await _hubContext.Clients.All.SendAsync(gameEntity.BlackPlayer.ToString(), "Winner");
                await _hubContext.Clients.All.SendAsync(gameEntity.WhitePlayer.ToString(), "Loser");
            }
            else
            {
                gameEntity.Winner = "White";
                await _hubContext.Clients.All.SendAsync(gameEntity.WhitePlayer.ToString(), "Winner");
                await _hubContext.Clients.All.SendAsync(gameEntity.BlackPlayer.ToString(), "Loser");
            }
            _context.Games.Update(gameEntity);
            _context.SaveChanges();

            return Ok();
        }
        [HttpPost("AcceptDraw")]
        public async Task<IActionResult> AcceptDraw(Guid guid)
        {
            var gameEntity = await _context.Games.FindAsync(guid);
            gameEntity.Winner = "Draw";

            await _hubContext.Clients.All.SendAsync(guid.ToString(), "Draw");

            _context.Games.Update(gameEntity);
            _context.SaveChanges();

            return Ok();

        }
    }
}
