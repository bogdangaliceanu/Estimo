using System;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace Estimo.Web
{
    public class GameController : ApiController
    {
        [HttpPost, Route("game")]
        public HttpResponseMessage NewGame()
        {
            var game = new Game();

            var response = new HttpResponseMessage(HttpStatusCode.Created);
            response.Headers.Location = new Uri(game.Id.ToString(), UriKind.Relative);
            return response;
        }
    }
}