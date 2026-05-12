using Inventory.Api.Services.Implementation;
using Inventory.Api.Services.Interfaces;
using System.Reflection;

namespace Inventory.Api.Modules
{
    public static class ConfigureServices
    {
        public static IServiceCollection AddApplicationServices(this IServiceCollection services)
        {
            services.AddScoped<IProducts, Product>();
            services.AddScoped<IAuthApplication, AuthApplication>();
            services.AddScoped<IJwtService, JwtService>();

            services.AddAutoMapper(cfg => { }, Assembly.GetExecutingAssembly());

            return services;
        }
    }
}
