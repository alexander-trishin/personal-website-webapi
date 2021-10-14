using FluentAssertions;
using System;
using Xunit;

namespace Ravenhorn.PersonalWebsite.Application.UnitTests
{
    public class GuardTests
    {
        [Fact]
        public void ThrowIfNull_ShouldReturnSameValue_WhenValueIsValueType()
        {
            int number = default;

            Guard.ThrowIfNull(number, nameof(number)).Should().Be(number);
        }

        [Fact]
        public void ThrowIfNull_ShouldReturnSameInstance_WhenValueIsReferenceType()
        {
            var text = "text";

            Guard.ThrowIfNull(text, nameof(text)).Should().BeSameAs(text);
        }

        [Fact]
        public void ThrowIfNull_ShouldThrowArgumentNullException_WhenValueIsNull()
        {
            bool? boolean = null;

            Action act = () => Guard.ThrowIfNull(boolean, nameof(boolean));

            act.Should().ThrowExactly<ArgumentNullException>().WithMessage("*'boolean'*");
        }

        [Theory]
        [InlineData("")]
        [InlineData(null)]
        public void ThrowIfNullOrEmpty_ShouldThrowArgumentException_WhenValueIsNullOrEmpty(string value)
        {
            Action act = () => Guard.ThrowIfNullOrEmpty(value, nameof(value));

            act.Should().ThrowExactly<ArgumentException>().WithMessage("*'value'*");
        }

        [Fact]
        public void ThrowIfNullOrEmpty_ShouldReturnSameString_WhenValidStringProvided()
        {
            var text = "text";

            Guard.ThrowIfNullOrEmpty(text, nameof(text)).Should().BeSameAs(text);
        }
    }
}
