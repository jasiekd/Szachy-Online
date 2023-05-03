

using System.Text;
using System;
using Newtonsoft.Json;
using System.Net.Http.Headers;
using Microsoft.AspNetCore.SignalR.Client;
using System.Threading.Tasks;

HttpClient client = new HttpClient();

string link = $"https://localhost:7225/api/Account/login";

var json = "{\"userName\":\"string\",\"password\":\"string\"}";
var content = new StringContent(json, Encoding.UTF8, "application/json");
var request = new HttpRequestMessage
{
    Method = HttpMethod.Post,
    RequestUri = new Uri(link),
    Headers =
                {
                    { "accept", "*/*" }
                },
    Content = content,
};

var response = await client.SendAsync(request);
var responseContent = await response.Content.ReadAsStringAsync();

dynamic data = JsonConvert.DeserializeObject(responseContent);

string token = data.accessToken;

Console.WriteLine(token);
client.DefaultRequestHeaders.Authorization = new AuthenticationHeaderValue("Bearer", token);

string link2 = $"https://localhost:7225/api/Account/getUser";
HttpResponseMessage response3 = await client.GetAsync(link2);

if (response.IsSuccessStatusCode)
{

    Console.WriteLine(await response3.Content.ReadAsStringAsync());
}

string link3 = $"https://localhost:7225/api/Game/CreateGameWithComputer";

HttpResponseMessage response4 = await client.GetAsync(link3);
var responseContent5 = await response4.Content.ReadAsStringAsync();
dynamic data2 = JsonConvert.DeserializeObject(responseContent5);

string gameid = data2.gameID;

static async Task WorkerMethodAsync()
{
    var connection = new HubConnectionBuilder()
            .WithUrl("http://localhost:7225/chesshub") // adres URL huba SignalR
            .Build();

    // ustawienie funkcji, która zostanie wywołana, gdy zostanie odebrana wiadomość
    connection.On<string>("ReceiveMove", (move) =>
    {
        Console.WriteLine($"Received move: {move}");
    });

    await connection.StartAsync();

    Console.WriteLine("Press any key to exit...");
    Console.ReadKey();

    await connection.DisposeAsync();
}

Thread workerThread = new Thread(new ThreadStart(async () =>
{
    await WorkerMethodAsync();
}));
workerThread.Start();


string link4 = $"https://localhost:7225/api/Game/Move/{gameid}/e4";

HttpResponseMessage response5 = await client.GetAsync(link4);





