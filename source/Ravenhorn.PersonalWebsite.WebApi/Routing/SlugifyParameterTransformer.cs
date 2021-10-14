﻿using Microsoft.AspNetCore.Routing;
using System.Text.RegularExpressions;

namespace Ravenhorn.PersonalWebsite.WebApi.Routing
{
    public sealed class SlugifyParameterTransformer : IOutboundParameterTransformer
    {
        public string TransformOutbound(object value)
        {
            return value is null
                ? null
                : Regex.Replace(value.ToString(), "([a-z])([A-Z])", "$1-$2").ToLower();
        }
    }
}
