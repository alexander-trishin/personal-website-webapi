namespace Ravenhorn.PersonalWebsite.Application.Configuration
{
    public sealed class CorsConfiguration
    {
        public const string SectionKey = "Cors";

        public string[] Origins { get; set; }
    }
}
