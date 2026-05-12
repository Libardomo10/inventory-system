using Inventory.Api.DTO;
using Inventory.Api.Models;

namespace Inventory.Api.Services.Interfaces
{
    public interface IProducts
    {
        public Task<Response<bool>> InsertMovementAsync(ProductMovementDto productMovementDto);
        public Task<Response<IEnumerable<ProductDto>>> GetInventoryAsync();

    }
}
