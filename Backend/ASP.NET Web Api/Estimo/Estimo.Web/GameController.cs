using System;
using System.Net;
using System.Net.Http;
using System.Threading.Tasks;
using System.Web.Http;

namespace Estimo.Web
{
    [Authenticated]
    public class GameController : ApiController
    {
        private readonly IGameRepository gameRepository;

        public GameController(IGameRepository gameRepository)
        {
            this.gameRepository = gameRepository;
        }

        [HttpPost, Route("game")]
        public async Task<HttpResponseMessage> NewGame()
        {
            var game = new Game();
            await gameRepository.Add(game).ConfigureAwait(false);

            var response = new HttpResponseMessage(HttpStatusCode.Created);
            response.Headers.Location = new Uri(game.Id.ToString(), UriKind.Relative);
            return response;
        }

        [HttpGet, Route("game/{id:guid}")]
        public Task<Game> GetGame(Guid id)
        {
            return gameRepository.Get(id);
        }
    }
}