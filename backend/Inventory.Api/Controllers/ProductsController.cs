using Inventory.Api.DTO;
using Inventory.Api.Models;
using Inventory.Api.Services.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Swashbuckle.AspNetCore.Annotations;

namespace Inventory.Api.Controllers
{
    [Authorize]
    [Route("api/[controller]")]
    [ApiController]
    [SwaggerTag("Operaciones relacionadas con productos")]
    public class ProductsController : ControllerBase
    {
        private readonly IProducts _products;

        public ProductsController(IProducts products)
        {
            _products = products;
        }

        [HttpGet("inventario")]
        [SwaggerOperation(
        Summary = "Lista la totalidad de productos.",
        Description = "Retorna un listado generico con el resultado de la operación")]
        [SwaggerResponse(200, "Productos encontrados", typeof(Response<IEnumerable<ProductDto>>))]
        public async Task<IActionResult> GetInventoryAsync()
        {
            var productsResponse = await _products.GetInventoryAsync();
            return Ok(productsResponse);
        }

        [HttpPost("productos/movimiento")]
        [SwaggerOperation(
        Summary = "Registra el movimiento de los productos (Entradas/Salidas).",
        Description = "Retorna un listado generico con el resultado de la operación")]
        [SwaggerResponse(200, "Movimiento registrado", typeof(Response<IEnumerable<ProductMovementDto>>))]
        public async Task<IActionResult> UpdateMovementAsync([FromBody] ProductMovementDto productMovementDto)
        {
            var response = await _products.InsertMovementAsync(productMovementDto);
            return Ok(response);
        }

    }
}
