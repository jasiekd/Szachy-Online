using Microsoft.AspNetCore.SignalR;

namespace szachy_online.Api.Hubs
{
    
    public class ChessHub : Hub
    {
        public async Task SendComputerMove(string move)
        {
            await Clients.All.SendAsync("ReceiveComputerMove", move);
        }
        public async Task OfferDraw(string receiverGuid) 
        {
            await Clients.All.SendAsync(receiverGuid, "Draw");
        }
        public async Task CancelDraw(string receiverGuid)
        {
            await Clients.All.SendAsync(receiverGuid, "CancelDraw");
        }
    }
}
