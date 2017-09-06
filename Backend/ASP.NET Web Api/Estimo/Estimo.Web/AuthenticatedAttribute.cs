using System.Linq;
using System.Net;
using System.Net.Http;
using System.Security.Principal;
using System.Threading;
using System.Web.Http.Controllers;
using System.Web.Http.Filters;

namespace Estimo.Web
{
    public class AuthenticatedAttribute : AuthorizationFilterAttribute
    {
        public override void OnAuthorization(HttpActionContext actionContext)
        {
            var authTokenManager = (AuthTokenManager)actionContext.ControllerContext.Configuration.DependencyResolver.GetService(typeof(AuthTokenManager));
            var authToken = GetAuthToken(actionContext);
            var user = authTokenManager.GetUser(authToken);
            if (user != null)
            {
                Thread.CurrentPrincipal = new GenericPrincipal(new GenericIdentity(user), null);
            }
            else
            {
                actionContext.Response = new HttpResponseMessage(HttpStatusCode.Unauthorized);
                return;
            }

            base.OnAuthorization(actionContext);
        }

        private string GetAuthToken(HttpActionContext actionContext)
        {
            return actionContext.Request.Headers.GetValues("X-Auth-Token")
                .SingleOrDefault();
        }
    }
}