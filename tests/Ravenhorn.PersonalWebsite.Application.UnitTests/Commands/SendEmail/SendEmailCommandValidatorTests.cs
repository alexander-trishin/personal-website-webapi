using FluentValidation.TestHelper;
using Ravenhorn.PersonalWebsite.Application.Commands.SendEmail;
using System.Linq;
using System.Threading.Tasks;
using Xunit;

namespace Ravenhorn.PersonalWebsite.Application.UnitTests.Commands.SendEmail
{
    public class SendEmailCommandValidatorTests
    {
        [Fact]
        public async Task ValidateAsync_ShouldReturnError_WhenNameIsTooLong()
        {
            var command = new SendEmailCommand
            {
                Name = new string(Enumerable.Repeat('x', 200).ToArray())
            };

            var actual = await new SendEmailCommandValidator().TestValidateAsync(command);

            actual.ShouldHaveValidationErrorFor(nameof(SendEmailCommand.Name));
        }

        [Fact]
        public async Task ValidateAsync_ShouldReturnError_WhenFromIsMissing()
        {
            var command = new SendEmailCommand();

            var actual = await new SendEmailCommandValidator().TestValidateAsync(command);

            actual.ShouldHaveValidationErrorFor(nameof(SendEmailCommand.From));
        }

        [Fact]
        public async Task ValidateAsync_ShouldReturnError_WhenFromIsNotEmail()
        {
            var command = new SendEmailCommand { From = "Ha HA, I will break the code!" };

            var actual = await new SendEmailCommandValidator().TestValidateAsync(command);

            actual.ShouldHaveValidationErrorFor(nameof(SendEmailCommand.From));
        }

        [Fact]
        public async Task ValidateAsync_ShouldReturnError_WhenSubjectIsEmpty()
        {
            var command = new SendEmailCommand { Subject = string.Empty };

            var actual = await new SendEmailCommandValidator().TestValidateAsync(command);

            actual.ShouldHaveValidationErrorFor(nameof(SendEmailCommand.Subject));
        }

        [Fact]
        public async Task ValidateAsync_ShouldReturnError_WhenSubjectIsToLong()
        {
            var command = new SendEmailCommand
            {
                Subject = new string(Enumerable.Repeat('x', 200).ToArray())
            };

            var actual = await new SendEmailCommandValidator().TestValidateAsync(command);

            actual.ShouldHaveValidationErrorFor(nameof(SendEmailCommand.Subject));
        }

        [Fact]
        public async Task ValidateAsync_ShouldReturnError_WhenMessageIsEmpty()
        {
            var command = new SendEmailCommand { Message = string.Empty };

            var actual = await new SendEmailCommandValidator().TestValidateAsync(command);

            actual.ShouldHaveValidationErrorFor(nameof(SendEmailCommand.Message));
        }

        [Fact]
        public async Task ValidateAsync_ShouldSayModelIsValid_WhenCommandIsValid()
        {
            var command = new SendEmailCommand
            {
                From = "test@email.com",
                Subject = "pew pew",
                Message = "hello world!"
            };

            var actual = await new SendEmailCommandValidator().TestValidateAsync(command);

            actual.ShouldNotHaveAnyValidationErrors();
        }
    }
}
