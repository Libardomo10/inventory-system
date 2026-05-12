using Inventory.Api.DTO;
using Inventory.Api.Models;

namespace Inventory.Api.Services.Interfaces
{
    public interface IAuthApplication
    {
        public Task<Response<TokenDto>> SignInAsync(SignInDto signInDto);
    }
}
