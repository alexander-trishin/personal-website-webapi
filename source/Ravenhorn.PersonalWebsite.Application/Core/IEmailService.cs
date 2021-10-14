using System.Threading;
using System.Threading.Tasks;

namespace Ravenhorn.PersonalWebsite.Application.Core
{
    public interface IEmailService
    {
        Task SendEmailAsync(
            string from,
            string subject,
            string text,
            CancellationToken cancellationToken = default
        );
    }
}
