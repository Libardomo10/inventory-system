namespace Inventory.Api.Services.Interfaces
{
    public interface IJwtService
    {
        public string GenerateToken(string username);
    }
}
