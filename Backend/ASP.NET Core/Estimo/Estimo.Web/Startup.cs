using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Configuration;
using Estimo.Web.Storage;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.IdentityModel.Tokens;
using System.Text;
using Microsoft.AspNetCore.Cors.Infrastructure;

namespace Estimo.Web
{
    public class Startup
    {
        private readonly IConfiguration configuration;

        public Startup(IConfiguration configuration)
        {
            this.configuration = configuration;
        }

        public void ConfigureServices(IServiceCollection services)
        {
            services.AddCors();

            services.Configure<JwtSettings>(configuration.GetSection("JwtSettings"));
            services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
                .AddJwtBearer(ConfigureJwtBearerOptions);

            services.AddMvc();

            services.Configure<FileStorageSettings>(configuration.GetSection("FileStorageSettings"));
            services.Add(new ServiceDescriptor(typeof(IUserRepository), typeof(FileSystemUserRepository), ServiceLifetime.Singleton));
            services.Add(new ServiceDescriptor(typeof(IGameRepository), typeof(FileSystemGameRepository), ServiceLifetime.Singleton));
        }

        private void ConfigureJwtBearerOptions(JwtBearerOptions options)
        {
            var jwtSettings = configuration.GetSection("JwtSettings").Get<JwtSettings>();

            options.TokenValidationParameters = new TokenValidationParameters()
            {
                NameClaimType = "http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier",
                ValidateActor = true,
                ValidateAudience = true,
                ValidateLifetime = true,
                ValidateIssuerSigningKey = true,
                ValidIssuer = jwtSettings.Issuer,
                ValidAudience = jwtSettings.Audience,
                IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(jwtSettings.SigningKey))
            };
        }

        public void Configure(IApplicationBuilder app, IHostingEnvironment env)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }

            app.UseCors(ConfigureCorsPolicy)
                .UseAuthentication()
                .UseMvc();
        }

        private void ConfigureCorsPolicy(CorsPolicyBuilder policy)
        {
            policy.AllowAnyHeader()
                .WithExposedHeaders("Location")
                .AllowAnyMethod()
                .AllowAnyOrigin();
        }
    }
}
