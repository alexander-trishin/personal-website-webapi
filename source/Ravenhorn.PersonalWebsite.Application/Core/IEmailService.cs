using System.Threading;
using System.Threading.Tasks;

namespace Ravenhorn.PersonalWebsite.Application.Core
{
    public interface IEmailService
    {
        Task SendEmailAsync(CancellationToken cancellationToken = default);
    }
}
