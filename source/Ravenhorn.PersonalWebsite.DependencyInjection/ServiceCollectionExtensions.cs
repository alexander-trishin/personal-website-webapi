using Intermedium;
using MailKit.Net.Smtp;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Ravenhorn.PersonalWebsite.Application.Configuration;
using Ravenhorn.PersonalWebsite.Application.Core;
using Ravenhorn.PersonalWebsite.Infrastructure;

namespace Ravenhorn.PersonalWebsite.DependencyInjection
{
    public static class ServiceCollectionExtensions
    {
        public static IServiceCollection AddApplicationServices(this IServiceCollection services, IConfiguration configuration)
        {
            services
                .AddOptions<SmtpOptions>()
                .Bind(configuration.GetSection(SmtpOptions.SectionKey))
                .ValidateDataAnnotations();

            services.AddTransient<ISmtpClient, SmtpClient>();
            services.AddTransient<IEmailService, EmailService>();

            services.AddIntermedium(options =>
            {
                options.ConfigurePipeline(
                    exceptionHandling: false,
                    postProcessing: false,
                    preProcessing: false
                );

                options.Scan(typeof(IEmailService));
            });

            return services;
        }
    }
}
