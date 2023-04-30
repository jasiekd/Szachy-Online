using Microsoft.AspNetCore.SignalR.Client;
using Newtonsoft.Json;
using System;

namespace ConsoleApp
{
    class Program
    {
        static async Task Main(string[] args)
        {
            

            var connection = new HubConnectionBuilder()
                .WithUrl("http://localhost:7225/chesshub") // adres URL huba SignalR
                .Build();

            connection.On<string>("ReceiveMove", (move) =>
            {
                Console.WriteLine($"Received move: {move}");
            });

            await connection.StartAsync();
            HttpClient client = new HttpClient();
            string link3 = $"https://localhost:7225/api/Game/CreateGameWithComputer";

            HttpResponseMessage response4 = await client.GetAsync(link3);
            var responseContent5 = await response4.Content.ReadAsStringAsync();
            dynamic data2 = JsonConvert.DeserializeObject(responseContent5);

            string gameid = data2.gameID;

            string link4 = $"https://localhost:7225/api/Game/Move/{gameid}/e4";

            HttpResponseMessage response5 = await client.GetAsync(link4);
            Console.WriteLine("Press any key to exit...");
            Console.ReadKey();

            await connection.DisposeAsync();
        }
    }
}