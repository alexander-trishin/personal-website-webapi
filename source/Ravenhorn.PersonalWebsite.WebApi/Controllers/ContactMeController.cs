using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Ravenhorn.PersonalWebsite.Application.Core;
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
        private readonly IEmailService _emailService;

        public ContactMeController(IEmailService emailService)
        {
            _emailService = emailService ?? throw new ArgumentNullException(nameof(emailService));
        }

        [HttpPost]
        [ProducesResponseType(typeof(string), StatusCodes.Status200OK)]
        public async Task<IActionResult> Post(CancellationToken cancellationToken)
        {
            await _emailService.SendEmailAsync(cancellationToken);

            return Ok("Message sent!");
        }
    }
}
