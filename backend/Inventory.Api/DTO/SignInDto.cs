namespace Inventory.Api.DTO
{
    public sealed record SignInDto
    {
        public string Username { get; set; } = string.Empty;
        public string Password { get; set; } = string.Empty;
    }
}
