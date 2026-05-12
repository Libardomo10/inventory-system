using Inventory.Api.Common.Enums;

namespace Inventory.Api.Models
{
    public class ProductMovement
    {
        public int ProductId { get; set; }

        public MovementType Type { get; set; }

        public Int64 Quantity { get; set; }
    }
}
