using Microsoft.AspNetCore.SignalR;

namespace szachy_online.Api.Hubs
{
    public class InvitationHub : Hub
    {
        public async Task SendGameInvitation(string senderGuid,string receiverGuid, string color)
        {
            await Clients.All.SendAsync(receiverGuid, senderGuid, color);
        }
        public async Task CancelGameInvitation(string receiverGuid)
        {
            await Clients.All.SendAsync(receiverGuid, "Cancel Invitation");
        }
        public async Task TimeOutGameInvitation(string receiverGuid)
        {
            await Clients.All.SendAsync(receiverGuid, "Friend not responded");
        }
    }
}
