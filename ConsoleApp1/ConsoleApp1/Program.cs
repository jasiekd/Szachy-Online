

using System.Text;
using System;
using Newtonsoft.Json;
using System.Net.Http.Headers;

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