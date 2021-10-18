using Intermedium;
using Ravenhorn.PersonalWebsite.Application.Core;
using System.Text;
using System.Threading;
using System.Threading.Tasks;

namespace Ravenhorn.PersonalWebsite.Application.Commands.SendEmail
{
    public sealed class SendEmailCommandHandler : AsyncCommandHandler<SendEmailCommand>
    {
        private readonly IEmailService _emailService;

        public SendEmailCommandHandler(IEmailService emailService)
        {
            _emailService = Guard.ThrowIfNull(emailService, nameof(emailService));
        }

        public override async Task HandleAsync(SendEmailCommand command, CancellationToken cancellationToken)
        {
            var builder = new StringBuilder(command.Message.Length + 512);

            if (!string.IsNullOrWhiteSpace(command.Name))
            {
                builder.AppendLine($"Name: {command.Name}");
            }

            builder.AppendLine($"From: {command.From}");
            builder.AppendLine();
            builder.AppendLine(command.Message);

            await _emailService.SendEmailAsync(command.Subject, builder.ToString(), cancellationToken);
        }
    }
}
