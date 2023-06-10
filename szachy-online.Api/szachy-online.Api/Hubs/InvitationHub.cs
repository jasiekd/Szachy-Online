using Microsoft.AspNetCore.SignalR;

namespace szachy_online.Api.Hubs
{
    public class InvitationHub : Hub
    {
        public async Task SendGameInvitation(string senderGuid,string receiverGuid, string color)
        {

            await Clients.All.SendAsync(receiverGuid, senderGuid, color);

        }
    }
}
