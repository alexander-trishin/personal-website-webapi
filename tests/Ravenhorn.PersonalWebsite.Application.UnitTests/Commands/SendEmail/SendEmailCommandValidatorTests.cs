using FluentAssertions;
using FluentValidation.Results;
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
            var actual = await ValidateAsync(new SendEmailCommand
            {
                Name = new string(Enumerable.Repeat('x', 200).ToArray())
            });

            actual.Errors.Should().Contain(error => error.PropertyName == nameof(SendEmailCommand.Name));
            actual.IsValid.Should().BeFalse();
        }

        [Fact]
        public async Task ValidateAsync_ShouldReturnError_WhenFromIsMissing()
        {
            var actual = await ValidateAsync(new SendEmailCommand());

            actual.Errors.Should().Contain(error => error.PropertyName == nameof(SendEmailCommand.From));
            actual.IsValid.Should().BeFalse();
        }

        [Fact]
        public async Task ValidateAsync_ShouldReturnError_WhenFromIsNotEmail()
        {
            var actual = await ValidateAsync(new SendEmailCommand { From = "Ha HA, I will break the code!" });

            actual.Errors.Should().Contain(error => error.PropertyName == nameof(SendEmailCommand.From));
            actual.IsValid.Should().BeFalse();
        }

        [Fact]
        public async Task ValidateAsync_ShouldReturnError_WhenSubjectIsEmpty()
        {
            var actual = await ValidateAsync(new SendEmailCommand { Subject = string.Empty });

            actual.Errors.Should().Contain(error => error.PropertyName == nameof(SendEmailCommand.Subject));
            actual.IsValid.Should().BeFalse();
        }

        [Fact]
        public async Task ValidateAsync_ShouldReturnError_WhenSubjectIsToLong()
        {
            var actual = await ValidateAsync(new SendEmailCommand
            {
                Subject = new string(Enumerable.Repeat('x', 200).ToArray())
            });

            actual.Errors.Should().Contain(error => error.PropertyName == nameof(SendEmailCommand.Subject));
            actual.IsValid.Should().BeFalse();
        }

        [Fact]
        public async Task ValidateAsync_ShouldReturnError_WhenMessageIsEmpty()
        {
            var actual = await ValidateAsync(new SendEmailCommand { Message = string.Empty });

            actual.Errors.Should().Contain(error => error.PropertyName == nameof(SendEmailCommand.Message));
            actual.IsValid.Should().BeFalse();
        }

        [Fact]
        public async Task ValidateAsync_ShouldSayModelIsValid_WhenCommandIsValid()
        {
            var actual = await ValidateAsync(new SendEmailCommand
            {
                From = "test@email.com",
                Subject = "pew pew",
                Message = "hello world!"
            });

            actual.IsValid.Should().BeTrue();
        }

        private static async Task<ValidationResult> ValidateAsync(SendEmailCommand command)
        {
            return await new SendEmailCommandValidator().ValidateAsync(command);
        }
    }
}
