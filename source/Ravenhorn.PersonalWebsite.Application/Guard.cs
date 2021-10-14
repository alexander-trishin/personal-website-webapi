using System;
using System.Diagnostics;

namespace Ravenhorn.PersonalWebsite.Application
{
    public static class Guard
    {
        [DebuggerHidden]
        public static T ThrowIfNull<T>(T value, string name)
        {
            return value == null
                ? throw new ArgumentNullException(name)
                : value;
        }

        [DebuggerHidden]
        public static string ThrowIfNullOrEmpty(string value, string name)
        {
            if (string.IsNullOrEmpty(value))
            {
                throw new ArgumentException($"'{name}' cannot be null or empty.", name);
            }

            return value;
        }
    }
}
