namespace Inventory.Api.DTO
{
    public sealed record ProductDto
    {
        public int Id { get; set; }
        public string Name { get; set; } = string.Empty;
        public Int64 Quantity { get; set; }
    }
}
