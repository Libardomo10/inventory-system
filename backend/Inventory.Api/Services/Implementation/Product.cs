using AutoMapper;
using Inventory.Api.Common.Enums;
using Inventory.Api.Data;
using Inventory.Api.DTO;
using Inventory.Api.Models;
using Inventory.Api.Services.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace Inventory.Api.Services.Implementation
{
    public class Product : IProducts
    {
        private readonly AppDbContext _context;
        private readonly IMapper _mapper;

        public Product(AppDbContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }

        public async Task<Response<IEnumerable<ProductDto>>> GetInventoryAsync()
        {
            var response = new Response<IEnumerable<ProductDto>>();
            try
            {
                var products = await _context.Products.Select(s => new ProductDto
                {
                    Id = s.Id,
                    Name = s.Name,
                    Quantity = s.Quantity
                })
                .ToListAsync();

                if (products != null)
                {
                    response.Data = products;
                    response.IsSuccess = true;
                    response.Message = "Consulta Exitoso!!!";
                }
            }
            catch (Exception e)
            {
                response.Message = e.Message;
                throw;
            }
            return response;
        }

        public async Task<Response<bool>> InsertMovementAsync(ProductMovementDto productMovementDto)
        {
            var response = new Response<bool>();
            try
            {
                var productMovementToUpdate = _mapper.Map<ProductMovement>(productMovementDto);

                var product = await _context.Products.FirstOrDefaultAsync(p => p.Id == productMovementToUpdate.ProductId);

                if (product == null)
                {
                    response.IsSuccess = false;
                    response.Message = "Producto no encontrado.";
                    return response;
                }

                if (productMovementToUpdate.Type.Equals(MovementType.Entry))
                {
                    product.Quantity += productMovementToUpdate.Quantity;
                }

                if (productMovementToUpdate.Type.Equals(MovementType.Exit))
                {
                    if (product.Quantity < productMovementToUpdate.Quantity)
                    {
                        response.IsSuccess = false;
                        response.Message = "Ajúste las salidas del producto ya que supera la cantidad que se encuentra de este item.";
                        return response;
                    }

                    product.Quantity -= productMovementToUpdate.Quantity;
                }

                await _context.SaveChangesAsync();

                response.Data = true;
                response.IsSuccess = true;
                response.Message = "Movimiento Exitoso!!!";
            }
            catch (Exception e)
            {
                response.Message = e.Message;
                throw;
            }
            return response;
        }
    }
}
