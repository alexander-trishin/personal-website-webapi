using Intermedium;

namespace Ravenhorn.PersonalWebsite.Application.Commands.SendEmail
{
    public sealed class SendEmailCommand : ICommand
    {
        public string Name { get; set; }
        public string From { get; set; }
        public string Subject { get; set; }
        public string Message { get; set; }
    }
}
