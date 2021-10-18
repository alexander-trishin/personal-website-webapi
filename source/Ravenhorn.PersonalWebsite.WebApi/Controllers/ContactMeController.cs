using Intermedium;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Ravenhorn.PersonalWebsite.Application;
using Ravenhorn.PersonalWebsite.Application.Commands.SendEmail;
using System.Net.Mime;
using System.Threading;
using System.Threading.Tasks;

namespace Ravenhorn.PersonalWebsite.WebApi.Controllers
{
    [ApiController]
    [ApiVersion("1.0")]
    [Route("v{version:apiVersion}/[controller]")]
    [Produces(MediaTypeNames.Application.Json)]
    public class ContactMeController : ControllerBase
    {
        private readonly IMediator _mediator;

        public ContactMeController(IMediator mediator)
        {
            _mediator = Guard.ThrowIfNull(mediator, nameof(mediator));
        }

        [HttpPost]
        [ProducesResponseType(StatusCodes.Status204NoContent)]
        public async Task<IActionResult> Post([FromBody] SendEmailCommand command, CancellationToken cancellationToken)
        {
            if (command is null)
            {
                return BadRequest("Required request body is missing.");
            }

            await _mediator.SendAsync(command, cancellationToken);
            return NoContent();
        }
    }
}
