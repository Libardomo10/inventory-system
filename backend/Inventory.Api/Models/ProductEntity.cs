namespace Inventory.Api.Models
{
    public class ProductEntity
    {
        public int Id { get; set; }
        public string Name { get; set; } = string.Empty;
        public Int64 Quantity { get; set; }
    }
}
