using MailKit.Net.Smtp;
using Microsoft.Extensions.Options;
using MimeKit;
using MimeKit.Text;
using Ravenhorn.PersonalWebsite.Application;
using Ravenhorn.PersonalWebsite.Application.Configuration;
using Ravenhorn.PersonalWebsite.Application.Core;
using System.Threading;
using System.Threading.Tasks;

namespace Ravenhorn.PersonalWebsite.Infrastructure
{
    public sealed class EmailService : IEmailService
    {
        private readonly SmtpOptions _options;
        private readonly ISmtpClient _client;

        public EmailService(IOptions<SmtpOptions> options, ISmtpClient client)
        {
            _options = Guard.ThrowIfNull(options?.Value, nameof(options));
            _client = Guard.ThrowIfNull(client, nameof(client));
        }

        public async Task SendEmailAsync(
            string subject,
            string text,
            CancellationToken cancellationToken = default)
        {
            Guard.ThrowIfNullOrEmpty(subject, nameof(subject));
            Guard.ThrowIfNullOrEmpty(text, nameof(text));

            cancellationToken.ThrowIfCancellationRequested();

            await _client.ConnectAsync(_options.Host, _options.Port, _options.UseSSL, cancellationToken);
            await _client.AuthenticateAsync(_options.Username, _options.Password, cancellationToken);

            var message = new MimeMessage();
            message.From.Add(MailboxAddress.Parse(_options.Username));
            message.To.Add(MailboxAddress.Parse(_options.Username));
            message.Subject = subject;
            message.Body = new TextPart(TextFormat.Text) { Text = text };

            await _client.SendAsync(message, cancellationToken);
        }
    }
}
