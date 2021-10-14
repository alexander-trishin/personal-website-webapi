using FluentAssertions;
using Intermedium;
using Moq;
using Ravenhorn.PersonalWebsite.Application.Commands.SendEmail;
using Ravenhorn.PersonalWebsite.Application.Core;
using System;
using System.Threading;
using System.Threading.Tasks;
using Xunit;

namespace Ravenhorn.PersonalWebsite.Application.UnitTests.Commands.SendEmail
{
    public class SendEmailCommandHandlerTests
    {
        [Fact]
        public void Constructor_ShouldThrowArgumentNullException_WhenEmailServiceParameterIsNull()
        {
            Action act = () => new SendEmailCommandHandler(null);

            act.Should().ThrowExactly<ArgumentNullException>().WithMessage("*'emailService'*");
        }

        [Fact]
        public async Task Constructor_ShouldPassCommandPropertiesToEmailService_WhenAllDataWasProvided()
        {
            var command = new SendEmailCommand
            {
                Name = "SPAMMER2012",
                From = "spam@gmail.com",
                Subject = "TRY THIS...",
                Message = "You just need to..."
            };

            var emailServiceMock = new Mock<IEmailService>();

            emailServiceMock
                .Setup(service => service.SendEmailAsync(
                    It.Is<string>(x => x == command.Subject),
                    It.Is<string>(x =>
                        x.Contains(command.Name)
                        && x.Contains(command.From)
                        && x.Contains(command.Message)),
                    It.IsAny<CancellationToken>()))
                .Returns(Task.CompletedTask)
                .Verifiable();

            ICommandHandler<SendEmailCommand> handler = new SendEmailCommandHandler(emailServiceMock.Object);

            await handler.HandleAsync(command, default);

            emailServiceMock.VerifyAll();
        }
    }
}
