using AutoMapper;
using Inventory.Api.DTO;
using Inventory.Api.Models;

namespace Inventory.Api.Common
{
    public class MappingsProfile : Profile
    {
        public MappingsProfile()
        {
            CreateMap<ProductEntity, ProductDto>().ReverseMap();
            CreateMap<ProductMovement, ProductMovementDto>().ReverseMap();
        }
    }
}
