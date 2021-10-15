using FluentAssertions;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Diagnostics.HealthChecks;
using Ravenhorn.PersonalWebsite.WebApi.HealthChecks;
using System;
using System.Collections.Generic;
using System.IO;
using System.Text.Json;
using System.Threading.Tasks;
using Xunit;

namespace Ravenhorn.PersonalWebsite.WebApi.UnitTests.HealthChecks
{
    public class HtmlJsonWriterTests
    {
        [Fact]
        public async Task WriteResponseAsync_ShouldWriteJsonString_WhenHealthReportWasProvided()
        {
            using var memoryStream = new MemoryStream();

            var context = new DefaultHttpContext();
            context.Response.Body = memoryStream;

            var report = new HealthReport(
                new Dictionary<string, HealthReportEntry>
                {
                    ["database"] = new HealthReportEntry(HealthStatus.Healthy, null, TimeSpan.Zero, null, null)
                },
                TimeSpan.Zero
            );

            await HealthJsonWriter.WriteResponseAsync(context, report);

            memoryStream.Position = 0;

            var actual = await new StreamReader(memoryStream).ReadToEndAsync();
            var expected = JsonSerializer.Serialize(new
            {
                status = "Healthy",
                results = new
                {
                    database = new
                    {
                        status = "Healthy",
                        description = (string)null,
                        data = new { }
                    }
                }
            }, new JsonSerializerOptions { WriteIndented = true });

            actual.Should().Be(expected);
        }
    }
}
