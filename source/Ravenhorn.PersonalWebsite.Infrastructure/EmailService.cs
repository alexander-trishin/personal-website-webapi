using MailKit.Net.Smtp;
using Microsoft.Extensions.Options;
using MimeKit;
using MimeKit.Text;
using Ravenhorn.PersonalWebsite.Application.Configuration;
using Ravenhorn.PersonalWebsite.Application.Core;
using System;
using System.Threading;
using System.Threading.Tasks;

namespace Ravenhorn.PersonalWebsite.Infrastructure
{
    public sealed class EmailService : IEmailService
    {
        private readonly SmtpOptions _options;

        public EmailService(IOptions<SmtpOptions> options)
        {
            _options = options?.Value ?? throw new ArgumentNullException(nameof(options));
        }

        public async Task SendEmailAsync(
            string from,
            string subject,
            string text,
            CancellationToken cancellationToken = default)
        {
            cancellationToken.ThrowIfCancellationRequested();

            using var client = new SmtpClient();

            await client.ConnectAsync(_options.Host, _options.Port, _options.UseSSL, cancellationToken);
            await client.AuthenticateAsync(_options.Username, _options.Password, cancellationToken);

            var message = new MimeMessage();
            message.From.Add(MailboxAddress.Parse(_options.Username));
            message.To.Add(MailboxAddress.Parse(_options.Username));
            message.Subject = subject;
            message.Body = new TextPart(TextFormat.Text) { Text = text };

            await client.SendAsync(message, cancellationToken);
        }
    }
}
