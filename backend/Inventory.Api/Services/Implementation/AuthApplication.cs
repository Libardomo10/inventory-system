using Inventory.Api.DTO;
using Inventory.Api.Models;
using Inventory.Api.Services.Interfaces;
using Microsoft.Extensions.Options;

namespace Inventory.Api.Services.Implementation
{
    public class AuthApplication : IAuthApplication
    {
        private readonly AuthSettings _authSettings;
        private readonly IJwtService _jwtService;

        public AuthApplication(IJwtService jwtService, IOptions<AuthSettings> authSettings)
        {
            _jwtService = jwtService;
            _authSettings = authSettings.Value;
        }

        public async Task<Response<TokenDto>> SignInAsync(SignInDto signInDto)
        {
            var response = new Response<TokenDto>();
            try
            {
                if (signInDto.Username != _authSettings.Username)
                {
                    response.Message = "Nombre de usuario invalido!";
                    return response;
                }

                if (signInDto.Password != _authSettings.Password)
                {
                    response.Message = "Contraseña invalida!";
                    return response;
                }

                var token = _jwtService.GenerateToken(signInDto.Username);

                response.Data = new TokenDto()
                {
                    AccessToken = token,
                    ExpiresIn = 3600
                };

                response.IsSuccess = true;
                response.Message = "Autenticación exitosa";
            }
            catch (Exception e)
            {
                response.Message = e.Message;
            }
         
            return response;
        }
    }
}
