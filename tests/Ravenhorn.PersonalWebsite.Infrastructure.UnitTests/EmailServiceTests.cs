using FluentAssertions;
using MailKit;
using MailKit.Net.Smtp;
using Microsoft.Extensions.Options;
using MimeKit;
using Moq;
using Ravenhorn.PersonalWebsite.Application.Configuration;
using System;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using Xunit;

namespace Ravenhorn.PersonalWebsite.Infrastructure.UnitTests
{
    public class EmailServiceTests
    {
        [Fact]
        public void Constructor_ShouldThrowArgumentNullException_WhenOptionsParameterIsNull()
        {
            Action act = () => new EmailService(null, new Mock<ISmtpClient>().Object);

            act.Should().ThrowExactly<ArgumentNullException>().WithMessage("*'options'*");
        }

        [Fact]
        public void Constructor_ShouldThrowArgumentNullException_WhenClientParameterIsNull()
        {
            Action act = () => new EmailService(MockOptions(), null);

            act.Should().ThrowExactly<ArgumentNullException>().WithMessage("*'client'*");
        }

        [Theory]
        [InlineData("")]
        [InlineData(null)]
        public async Task SendEmailAsync_ShouldThrowArgumentException_WhenSubjectParameterIsNullOrEmpty(string subject)
        {
            var service = new EmailService(MockOptions(), new Mock<ISmtpClient>().Object);

            Func<Task> act = () => service.SendEmailAsync(subject, "test-text");

            await act.Should().ThrowExactlyAsync<ArgumentException>().WithMessage("*subject*");
        }

        [Theory]
        [InlineData("")]
        [InlineData(null)]
        public async Task SendEmailAsync_ShouldThrowArgumentException_WhenTextParameterIsNullOrEmpty(string text)
        {
            var service = new EmailService(MockOptions(), new Mock<ISmtpClient>().Object);

            Func<Task> act = () => service.SendEmailAsync("test-subject", text);

            await act.Should().ThrowExactlyAsync<ArgumentException>().WithMessage("*text*");
        }

        [Fact]
        public async Task SendEmailAsync_ShouldSendEmail_WhenAllRequirementsArMet()
        {
            var options = new SmtpOptions
            {
                Host = "test-host",
                Port = 666,
                UseSSL = false,
                Username = "test-username",
                Password = "test-password"
            };

            var clientMock = new Mock<ISmtpClient>();

            clientMock
                .Setup(client => client.ConnectAsync(
                    It.IsAny<string>(),
                    It.IsAny<int>(),
                    It.IsAny<bool>(),
                    It.IsAny<CancellationToken>()))
                .Returns(Task.CompletedTask);

            clientMock
                .Setup(client => client.AuthenticateAsync(
                    It.IsAny<string>(),
                    It.IsAny<string>(),
                    It.IsAny<CancellationToken>()))
                .Returns(Task.CompletedTask);

            clientMock
                .Setup(client => client.SendAsync(
                    It.Is<MimeMessage>(message => message.From.Single(x => x.ToString().Contains(options.Username)) != null),
                    It.IsAny<CancellationToken>(),
                    It.IsAny<ITransferProgress>()))
                .Returns(Task.CompletedTask)
                .Verifiable();

            var service = new EmailService(MockOptions(options), clientMock.Object);

            await service.SendEmailAsync("test-subject", "test-text");

            clientMock.VerifyAll();
        }

        private static IOptions<SmtpOptions> MockOptions(SmtpOptions options = null)
        {
            return Options.Create(options ?? new SmtpOptions());
        }
    }
}
