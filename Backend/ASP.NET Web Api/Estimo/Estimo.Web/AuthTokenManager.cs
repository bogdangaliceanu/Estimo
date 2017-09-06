using System.Collections.Generic;

namespace Estimo.Web
{
    public class AuthTokenManager
    {
        private readonly Dictionary<string, string> userTokens = new Dictionary<string, string>();

        public void Set(string username, string token)
        {
            this.userTokens[username] = token;
        }

        public string GetUser(string token)
        {
            foreach (var kv in userTokens)
            {
                if (kv.Value == token)
                {
                    return kv.Key;
                }
            }
            return null;
        }
    }
}