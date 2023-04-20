using szachy_online.Api.Dto;

namespace szachy_online.Api.Services
{
    public class AccountService
    {
        private readonly TokenService _tokenService;
        public AccountService(TokenService tokenService)
        {
            _tokenService = tokenService;
        }

        public TokenInfoDto LoginUser(UserLoginRequestDto loginData)
        {
            if (loginData.UserName == "admin" && loginData.Password == "admin")
            {
                var result = new TokenInfoDto();
                result.AccessToken = _tokenService.GenerateBearerToken();
                result.RefreshToken = _tokenService.GenerateRefreshToken();

                return result;
            }
            else
                return null;
        }
    }
}
