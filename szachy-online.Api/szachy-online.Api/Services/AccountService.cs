using System.Security.Cryptography;
using System.Text;
using szachy_online.Api.Data;
using szachy_online.Api.Dto;

namespace szachy_online.Api.Services
{
    public class AccountService
    {
        private readonly TokenService _tokenService;
        private readonly DataContext _context;
        public AccountService(TokenService tokenService, DataContext context)
        {
            _tokenService = tokenService;
            _context = context;
    }

        public TokenInfoDto LoginUser(UserLoginRequestDto loginData)
        {
            if (_context.Accounts == null)
            {
                return null;
            }
            else
            {
                var accountEntity = _context.Accounts.Where(x=> x.Login == loginData.UserName).FirstOrDefault();
                if (accountEntity!=null) {
                    SHA256 sha256 = SHA256Managed.Create();
                    byte[] bytes = Encoding.UTF8.GetBytes(loginData.Password);
                    byte[] hash = sha256.ComputeHash(bytes);
                    string password = Convert.ToBase64String(hash);
                    if (accountEntity.Password == password) {
                        var result = new TokenInfoDto();
                        result.AccessToken = _tokenService.GenerateBearerToken();
                        result.RefreshToken = _tokenService.GenerateRefreshToken();

                        return result;
                    }
                    else
                    {
                        return null;
                    }
                }
                else
                {
                    return null;
                }
            }
            //if (loginData.UserName == "admin" && loginData.Password == "admin")
            //{
            //    var result = new TokenInfoDto();
            //    result.AccessToken = _tokenService.GenerateBearerToken();
            //    result.RefreshToken = _tokenService.GenerateRefreshToken();

            //    return result;
            //}
            //else
            //    return null;
        }
    }
}
