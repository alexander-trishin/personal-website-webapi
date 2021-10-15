using FluentValidation.AspNetCore;
using MicroElements.Swashbuckle.FluentValidation.AspNetCore;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Diagnostics.HealthChecks;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Mvc.ApplicationModels;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Options;
using Microsoft.OpenApi.Models;
using Ravenhorn.PersonalWebsite.Application;
using Ravenhorn.PersonalWebsite.Application.Configuration;
using Ravenhorn.PersonalWebsite.DependencyInjection;
using Ravenhorn.PersonalWebsite.WebApi.HealthChecks;
using Ravenhorn.PersonalWebsite.WebApi.Routing;
using Serilog;
using System;
using System.Diagnostics.CodeAnalysis;

namespace Ravenhorn.PersonalWebsite.WebApi
{
    [ExcludeFromCodeCoverage]
    public class Startup
    {
        private readonly IConfiguration _configuration;

        public Startup(IConfiguration configuration)
        {
            _configuration = configuration;
        }

        public void ConfigureServices(IServiceCollection services)
        {
            services
                .AddControllers(options =>
                {
                    options.Conventions.Add(new RouteTokenTransformerConvention(new SlugifyParameterTransformer()));
                })
                .AddFluentValidation(options =>
                {
                    options.RegisterValidatorsFromAssemblyContaining(typeof(Guard));
                });

            services.AddApplicationServices(_configuration);

            services.AddCors(builder =>
            {
                var options = _configuration
                    .GetSection(CorsOptions.SectionKey)
                    .Get<CorsOptions>();

                builder.AddDefaultPolicy(policy =>
                {
                    policy.WithOrigins(options.Origins);
                });
            });

            services
                .AddHealthChecks()
                .AddNpgSql(_configuration.GetConnectionString("WebApi"), name: "database");

            services.AddAntiforgery(options =>
            {
                options.SuppressXFrameOptionsHeader = true;
            });

            services.AddHsts(options =>
            {
                options.IncludeSubDomains = true;
                options.MaxAge = TimeSpan.FromDays(365);
            });

            services.AddSwaggerGen(options =>
            {
                options.SwaggerDoc("v1", new OpenApiInfo { Title = "Personal Website - Web Api", Version = "v1" });
            });

            services.AddFluentValidationRulesToSwagger();
        }

        public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
                app.UseSwagger();
                app.UseSwaggerUI(x => x.SwaggerEndpoint("/swagger/v1/swagger.json", "Personal Website - Web Api v1"));
            }
            else
            {
                app.UseHsts();
            }

            app.UseSerilogRequestLogging();
            app.UseHttpsRedirection();

            app.Use(async (context, next) =>
            {
                context.Response.Headers["X-Frame-Options"] = "DENY";
                context.Response.Headers["X-Xss-Protection"] = "1; mode=block";
                context.Response.Headers["X-Content-Type-Options"] = "nosniff";
                context.Response.Headers["Referrer-Policy"] = "no-referrer";

                await next();
            });

            app.UseCors();
            app.UseRouting();
            app.UseAuthorization();

            app.UseEndpoints(endpoints =>
            {
                endpoints.MapHealthChecks("/health", new HealthCheckOptions
                {
                    AllowCachingResponses = false,
                    ResponseWriter = HealthJsonWriter.WriteResponseAsync
                });

                endpoints.MapControllers();
            });
        }
    }
}
