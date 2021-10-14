using FluentAssertions;
using Ravenhorn.PersonalWebsite.WebApi.Routing;
using Xunit;

namespace Ravenhorn.PersonalWebsite.WebApi.UnitTests.Routing
{
    public class SlugifyParameterTransformerTests
    {
        [Fact]
        public void TransformOutbound_ShouldReturnNull_WhenValueIsNull()
        {
            var transformer = new SlugifyParameterTransformer();

            var actual = transformer.TransformOutbound(null);

            actual.Should().BeNull();
        }

        [Theory]
        [InlineData("", "")]
        [InlineData("Home", "home")]
        [InlineData("ContactMe", "contact-me")]
        [InlineData("Account/SignUp", "account/sign-up")]
        public void TransformOutbound_ShouldTransformToSnakeCase_WhenStringValueProvided(string input, string output)
        {
            var transformer = new SlugifyParameterTransformer();

            var actual = transformer.TransformOutbound(input);

            actual.Should().Be(output);
        }
    }
}
