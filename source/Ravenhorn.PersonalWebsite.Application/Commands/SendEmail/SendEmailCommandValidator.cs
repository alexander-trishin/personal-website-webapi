using FluentValidation;
using FluentValidation.Validators;

namespace Ravenhorn.PersonalWebsite.Application.Commands.SendEmail
{
    public sealed class SendEmailCommandValidator : AbstractValidator<SendEmailCommand>
    {
        public SendEmailCommandValidator()
        {
            RuleFor(command => command.Name)
                .MaximumLength(128);

            RuleFor(command => command.From)
                .NotEmpty()
                .EmailAddress(EmailValidationMode.AspNetCoreCompatible);

            RuleFor(command => command.Subject)
                .NotEmpty()
                .MaximumLength(128);

            RuleFor(command => command.Message)
                .NotEmpty();
        }
    }
}
