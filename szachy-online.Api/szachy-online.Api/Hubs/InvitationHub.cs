using Microsoft.AspNetCore.SignalR;

namespace szachy_online.Api.Hubs
{
    public class InvitationHub : Hub
    {
        private CancellationTokenSource cancellationTokenSource;
        public async Task SendGameInvitation(string senderGuid,string receiverGuid, string color)
        {
            cancellationTokenSource = new CancellationTokenSource();

            await Clients.All.SendAsync(receiverGuid, senderGuid, color);

            Thread countdownThread = new Thread(async () =>
            {
                await Task.Delay(TimeSpan.FromSeconds(60), cancellationTokenSource.Token); // Oczekiwanie 60 sekund

                if (!cancellationTokenSource.Token.IsCancellationRequested)
                {
                    // Wysyłanie informacji o upływie czasu
                    //await Clients.All.SendAsync(receiverGuid, "Time expired");
                    //await Clients.All.SendAsync(senderGuid, "Time expired");
                }
            });

            countdownThread.Start(); // Startowanie wątku
        }
        public void StopCountdown()
        {
            cancellationTokenSource?.Cancel();
        }
    }
}
