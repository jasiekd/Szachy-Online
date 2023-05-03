using Microsoft.AspNetCore.SignalR;

namespace szachy_online.Api.Hubs
{
    public class ChessHub : Hub
    {
        public async Task SendComputerMove(string move)
        {
            await Clients.All.SendAsync("ReceiveComputerMove", move);
        }
    }
}
