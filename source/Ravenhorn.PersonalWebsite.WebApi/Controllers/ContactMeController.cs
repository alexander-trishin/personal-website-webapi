using Intermedium;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Ravenhorn.PersonalWebsite.Application.Commands.SendEmail;
using System;
using System.Net.Mime;
using System.Threading;
using System.Threading.Tasks;

namespace Ravenhorn.PersonalWebsite.WebApi.Controllers
{
    [ApiController]
    [Route("[controller]")]
    [Produces(MediaTypeNames.Application.Json)]
    public class ContactMeController : ControllerBase
    {
        private readonly IMediator _mediator;

        public ContactMeController(IMediator mediator)
        {
            _mediator = mediator ?? throw new ArgumentNullException(nameof(mediator));
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
