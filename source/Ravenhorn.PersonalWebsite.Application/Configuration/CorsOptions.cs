using System.ComponentModel.DataAnnotations;

namespace Ravenhorn.PersonalWebsite.Application.Configuration
{
    public sealed class CorsOptions
    {
        public const string SectionKey = "Cors";

        [Required]
        [MinLength(1)]
        public string[] Origins { get; set; }

        [Required]
        [MinLength(1)]
        public string[] Methods { get; set; }

        [Required]
        [MinLength(1)]
        public string[] Headers { get; set; }
    }
}
