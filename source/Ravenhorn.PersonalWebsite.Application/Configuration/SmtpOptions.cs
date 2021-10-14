using System.ComponentModel.DataAnnotations;

namespace Ravenhorn.PersonalWebsite.Application.Configuration
{
    public sealed class SmtpOptions
    {
        public const string SectionKey = "Smtp";

        [Required]
        public string Host { get; set; }

        [Required]
        [Range(0, ushort.MaxValue)]
        public int Port { get; set; }

        public bool UseSSL { get; set; }

        [Required]
        [DataType(DataType.EmailAddress)]
        public string Username { get; set; }

        [Required]
        [DataType(DataType.Password)]
        public string Password { get; set; }
    }
}
