
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.SignalR;
using Microsoft.EntityFrameworkCore;
using pax.chess;
using System.Linq;
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
        private readonly GameService _gameService;
        public GameController(AccountService accountService, DataContext context, IHubContext<ChessHub> hubContext, IHubContext<InvitationHub> invHubContext, GameService gameService)
        {
            _accountService = accountService;
            _context = context;
            _hubContext = hubContext;
            _invHubContext = invHubContext;
            _gameService = gameService;
        }

        [HttpPost("GetInfoAboutGame")]
        public async Task<IActionResult> GetInfoAboutGame([FromBody] Guid gameID)
        {
            var gameEntity = await _context.Games.Include(x => x.WhitePlayer).Include(x => x.BlackPlayer).FirstOrDefaultAsync(x => x.GameID == gameID);
            if (gameEntity == null)
            {
                return NotFound();
            }

            var response = new
            {
                GameID = gameEntity.GameID,
                WhiteID = gameEntity.WhitePlayer.Id,
                WhiteNickname = gameEntity.WhitePlayer.Nickname,
                BlackID = gameEntity.BlackPlayer.Id,
                BlackNickname = gameEntity.BlackPlayer.Nickname,
                PGN = gameEntity.PGN,
            };

            return Ok(response);
        }

        [HttpPost("SetWinner")]
        public async Task<IActionResult> SetWinner(Guid gameID, string result)
        {
            var gameEntity = await _context.Games.FirstOrDefaultAsync(x => x.GameID == gameID);
            if (gameEntity == null)
            {
                return NotFound();
            }
            gameEntity.Winner = result;
            _context.Games.Update(gameEntity);
            _context.SaveChanges();
            return Ok();
        }

        [HttpGet("ComputerMove/{gid}/{move}")]
        public async Task<IActionResult> ComputerMove(Guid gid, string move)
        {
            var gameEntity = await _context.Games.FindAsync(gid);

            Guid userId = Guid.Parse(User.FindFirstValue(ClaimTypes.NameIdentifier));

            if (gameEntity.PGN == null)
                gameEntity.PGN = "1." + move; // Rozpoczynamy numerację ruchów od 1
            else
            {
                var moves = gameEntity.PGN.Split(' ').ToList();
                if (moves.Count % 2 == 0)
                {
                    var test2= moves.ElementAt(moves.Count - 2).Split('.').ToList();
                    var lastMoveNumber = int.Parse(test2[0]);
                    var newMoveNumber = lastMoveNumber + 1;
                    move = newMoveNumber + "." + move;
                }
                gameEntity.PGN += " " + move;
            }

            _context.Games.Update(gameEntity);
            _context.SaveChanges();

            var machine = await _context.Machines.FindAsync((gameEntity.BlackPlayerID == userId) ? gameEntity.WhitePlayerID : gameEntity.BlackPlayerID);
            string computerMove = (machine.Level != "Random") ? await _gameService.GetBestMove(gameEntity.PGN, machine.Level) : await _gameService.GetRandomMove(gameEntity.PGN);

            if (gameEntity.PGN == null)
                gameEntity.PGN = "1." + computerMove; // Rozpoczynamy numerację ruchów od 1
            else
            {
                var moves = gameEntity.PGN.Split(' ').ToList();
                if (moves.Count % 2 == 0)
                {
                    var test2 = moves.ElementAt(moves.Count - 2).Split('.').ToList();
                    var lastMoveNumber = int.Parse(test2[0]);
                    var newMoveNumber = lastMoveNumber + 1;
                    computerMove = newMoveNumber + "." + computerMove;
                }
                gameEntity.PGN += " " + computerMove;
            }

            _context.Games.Update(gameEntity);
            _context.SaveChanges();


            await _hubContext.Clients.All.SendAsync(gid.ToString(), computerMove);

            return Ok();
        }

        [HttpGet("PlayerMove/{gid}/{move}")]
        public async Task<IActionResult> PlayerMove(Guid gid, string move)
        {
            Guid userId = Guid.Parse(User.FindFirstValue(ClaimTypes.NameIdentifier));

            var gameEntity = await _context.Games.FindAsync(gid);
            if (gameEntity.PGN == null)
                gameEntity.PGN = "1." + move; // Rozpoczynamy numerację ruchów od 1
            else
            {
                var moves = gameEntity.PGN.Split(' ').ToList();
                if (moves.Count % 2 == 0)
                {
                    var test2 = moves.ElementAt(moves.Count - 2).Split('.').ToList();
                    var lastMoveNumber = int.Parse(test2[0]);
                    var newMoveNumber = lastMoveNumber + 1;
                    move = newMoveNumber + "." + move;
                }
                gameEntity.PGN += " " + move;
            }

            _context.Games.Update(gameEntity);
            _context.SaveChanges();

            if(gameEntity.WhitePlayerID == userId)
            {
                await _hubContext.Clients.All.SendAsync(gameEntity.BlackPlayerID.ToString(), move);
            }
            else 
            {
                await _hubContext.Clients.All.SendAsync(gameEntity.WhitePlayerID.ToString(), move);
            }
           
            return Ok();
        }

        [HttpPost("CreateGameWithComputer")]
        public async Task<IActionResult> CreateGameWithComputer(string level, string color, int openingId)
        {
            Guid userId = Guid.Parse(User.FindFirstValue(ClaimTypes.NameIdentifier));
            var machine = await _context.Machines.Where(x => x.Level == level).FirstOrDefaultAsync();

            

            GameEntity game = new GameEntity
            {
                GameID = Guid.NewGuid(),
                WhitePlayerID = Guid.NewGuid(),
                BlackPlayerID = Guid.NewGuid(),
                DateStarted = DateTime.Now,
            };
            if (openingId != 0)
            {
                var opening = await _context.Openings.FindAsync(openingId);
                game.PGN = opening.PGN;
            }

                if (color == "Random")
            {
                Random random = new Random();
                int randomNumber = random.Next(2);
                color = (randomNumber == 0) ? "BlackPlayer" : "WhitePlayer";
            }
            if (color == "WhitePlayer")
            {
                game.WhitePlayerID = userId;
                game.BlackPlayerID = machine.Id;
            }
            else if (color == "BlackPlayer")
            {
                game.BlackPlayerID = userId;
                game.WhitePlayerID = machine.Id;
            }

            _context.Games.Add(game);
            await _context.SaveChangesAsync();

            GameIdDto gamedto = new GameIdDto { 
                GameID = game.GameID.ToString(),
                PGN = game.PGN,
            };
            
            return Ok(gamedto);
        }

        [HttpPost("StartGameWithComputer")]
        public async Task<IActionResult> StartGameWithComputer(Guid guid)
        {
            var gameEntity = await _context.Games.FindAsync(guid);
            Guid userId = Guid.Parse(User.FindFirstValue(ClaimTypes.NameIdentifier));


            if (gameEntity.WhitePlayerID != userId)
            {
                var machine = await _context.Machines.FindAsync((gameEntity.BlackPlayerID == userId) ? gameEntity.WhitePlayerID : gameEntity.BlackPlayerID);
                string computerMove = (machine.Level != "Random") ? await _gameService.GetBestMove(gameEntity.PGN, machine.Level) : await _gameService.GetRandomMove(gameEntity.PGN);

                if (gameEntity.PGN == null)
                    gameEntity.PGN = "1." + computerMove; // Rozpoczynamy numerację ruchów od 1
                else
                {
                    var moves = gameEntity.PGN.Split(' ').ToList();
                    if (moves.Count % 2 == 0)
                    {
                        var test2 = moves.ElementAt(moves.Count - 2).Split('.').ToList();
                        var lastMoveNumber = int.Parse(test2[0]);
                        var newMoveNumber = lastMoveNumber + 1;
                        computerMove = newMoveNumber + "." + computerMove;
                    }
                    gameEntity.PGN += " " + computerMove;
                }

                _context.Games.Update(gameEntity);
                _context.SaveChanges();


                await _hubContext.Clients.All.SendAsync(guid.ToString(), computerMove);
            }
            return Ok();
        }



        [HttpPost("CreateGameOnlineWithPlayer")]
        public async Task<IActionResult> CreateGameOnlineWithPlayer(Guid guid, string color)
        {
            Guid userId = Guid.Parse(User.FindFirstValue(ClaimTypes.NameIdentifier));

            GameEntity temp = new GameEntity
            {
                GameID = Guid.NewGuid(),
                WhitePlayerID = Guid.NewGuid(),
                BlackPlayerID = Guid.NewGuid(),
                DateStarted = DateTime.Now,

            };

            if (color=="Random")
            {
                Random random = new Random();
                int randomNumber = random.Next(2);
                color = (randomNumber == 0) ? "BlackPlayer" : "WhitePlayer";
            }
            if (color == "WhitePlayer")
            {
                temp.WhitePlayerID = guid;
                temp.BlackPlayerID = userId;
            }
            else if (color == "BlackPlayer")
            {
                temp.BlackPlayerID = guid;
                temp.WhitePlayerID = userId;
            }

            _context.Games.Add(temp);
            await _context.SaveChangesAsync();

            await _hubContext.Clients.All.SendAsync(guid.ToString(), temp.GameID);
            await _hubContext.Clients.All.SendAsync(userId.ToString(), temp.GameID);

            return Ok(temp.GameID);
        }


        [HttpPost("Forfeit")]
        public async Task<IActionResult> Forfeit(Guid guid)
        {
            Guid userId = Guid.Parse(User.FindFirstValue(ClaimTypes.NameIdentifier));
            var gameEntity = await _context.Games.FindAsync(guid);
            if( gameEntity.WhitePlayerID == userId)
            {
                if (gameEntity.BlackPlayerID.Equals(Guid.Empty))
                {
                    gameEntity.Winner = "Machine";
                }
                else
                {
                    gameEntity.Winner = "BlackPlayer";
                    await _hubContext.Clients.All.SendAsync(gameEntity.BlackPlayerID.ToString(), "Winner");
                }
                
                await _hubContext.Clients.All.SendAsync(gameEntity.WhitePlayerID.ToString(), "Loser");
            }
            else
            {
                if (gameEntity.WhitePlayerID.Equals(Guid.Empty))
                {
                    gameEntity.Winner = "Machine";
                }
                else
                {
                    gameEntity.Winner = "WhitePlayer";
                    await _hubContext.Clients.All.SendAsync(gameEntity.WhitePlayerID.ToString(), "Winner");
                }

                await _hubContext.Clients.All.SendAsync(gameEntity.BlackPlayerID.ToString(), "Loser");
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
