using System;
using System.Net;
using System.Threading.Tasks;
using Estimo.Web.Models;
using Newtonsoft.Json;
using Newtonsoft.Json.Serialization;
using Microsoft.AspNetCore.Mvc;
using Estimo.Web.Storage;
using Microsoft.AspNetCore.Authorization;

namespace Estimo.Web.Controllers
{
    [Authorize]
    [Route("game")]
    public class GameController : Controller
    {
        private static readonly object estimationLock = new object();
        private static readonly JsonSerializerSettings camelCaseSettings = new JsonSerializerSettings { ContractResolver = new CamelCasePropertyNamesContractResolver() };

        private readonly IGameRepository gameRepository;

        public GameController(IGameRepository gameRepository)
        {
            this.gameRepository = gameRepository;
        }

        [HttpPost, Route("game")]
        public async Task<IActionResult> NewGame()
        {
            var player = User.Identity.Name;
            var game = new Game(player);
            await gameRepository.Add(game).ConfigureAwait(false);

            return Created(new Uri(game.Id.ToString(), UriKind.Relative), null);
        }

        [HttpPost, Route("game/{id:guid}/round")]
        public async Task<IActionResult> NewRound(Guid id, [FromBody] NewRoundModel roundModel)
        {
            var game = await gameRepository.Get(id).ConfigureAwait(false);
            var player = User.Identity.Name;

            if (game.NewRound(roundModel.Subject, player) is Failure<string> f)
            {
                return StatusCode((int)HttpStatusCode.Forbidden, f.Data);
            }

            await gameRepository.Update(game).ConfigureAwait(false);
            return Ok();
        }

        [HttpPut, Route("game/{id:guid}/round")]
        public async Task<IActionResult> FinishRound(Guid id, [FromBody] FinishedRoundModel roundModel)
        {
            var game = await gameRepository.Get(id).ConfigureAwait(false);
            var player = User.Identity.Name;

            if (game.FinishCurrentRound(roundModel.Consensus, player) is Failure<string> f)
            {
                return StatusCode((int)HttpStatusCode.Forbidden, f.Data);
            }

            await gameRepository.Update(game).ConfigureAwait(false);
            return Ok();
        }

        [HttpPost, Route("game/{id:guid}/estimation")]
        public IActionResult Estimate(Guid id, [FromBody] EstimationModel estimationModel)
        {
            lock (estimationLock)
            {
                var game = gameRepository.Get(id).Result;
                var player = User.Identity.Name;

                var estimation = new Estimation(estimationModel.Value, player);

                if (game.Estimate(estimation) is Failure<string> f)
                {
                    return StatusCode((int)HttpStatusCode.Forbidden, f.Data);
                }

                gameRepository.Update(game).Wait();
                return Ok();
            }
        }

        [HttpGet, Route("game/{id:guid}")]
        public async Task<IActionResult> GetGame(Guid id)
        {
            var game = await gameRepository.Get(id).ConfigureAwait(false);
            if (game == null)
            {
                return NotFound();
            }

            var player = User.Identity.Name;
            var model = GameModel.Build(game, player);
            return Json(model, camelCaseSettings);
        }
    }
}