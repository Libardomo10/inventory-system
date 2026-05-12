using Inventory.Api.Common.Enums;
using Inventory.Api.Models;

namespace Inventory.Api.DTO
{
    public sealed record ProductMovementDto
    {
        public int ProductId { get; set; }

        public MovementType Type { get; set; }

        public Int64 Quantity { get; set; }
    }
}
