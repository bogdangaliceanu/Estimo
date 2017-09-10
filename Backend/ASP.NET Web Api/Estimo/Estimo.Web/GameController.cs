﻿using System;
using System.Net;
using System.Net.Http;
using System.Threading;
using System.Threading.Tasks;
using System.Web.Http;

namespace Estimo.Web
{
    [Authenticated]
    public class GameController : ApiController
    {
        private static readonly object estimationLock = new object();

        private readonly IGameRepository gameRepository;

        public GameController(IGameRepository gameRepository)
        {
            this.gameRepository = gameRepository;
        }

        [HttpPost, Route("game")]
        public async Task<HttpResponseMessage> NewGame()
        {
            var player = Thread.CurrentPrincipal.Identity.Name;
            var game = new Game(player);
            await gameRepository.Add(game).ConfigureAwait(false);

            var response = new HttpResponseMessage(HttpStatusCode.Created);
            response.Headers.Location = new Uri(game.Id.ToString(), UriKind.Relative);
            return response;
        }

        [HttpPost, Route("game/{id:guid}/round")]
        public async Task<HttpResponseMessage> NewRound(Guid id, [FromBody] NewRoundModel roundModel)
        {
            var game = await gameRepository.Get(id).ConfigureAwait(false);
            var player = Thread.CurrentPrincipal.Identity.Name;

            if (game.NewRound(roundModel.Subject, player) is Failure<string> f)
            {
                return new HttpResponseMessage(HttpStatusCode.Forbidden)
                {
                    Content = new StringContent(f.Data)
                };
            }

            await gameRepository.Update(game).ConfigureAwait(false);
            return new HttpResponseMessage(HttpStatusCode.OK);
        }

        [HttpPut, Route("game/{id:guid}/round")]
        public async Task<HttpResponseMessage> FinishRound(Guid id, [FromBody] FinishedRoundModel roundModel)
        {
            var game = await gameRepository.Get(id).ConfigureAwait(false);
            var player = Thread.CurrentPrincipal.Identity.Name;

            if (game.FinishCurrentRound(roundModel.Consensus, player) is Failure<string> f)
            {
                return new HttpResponseMessage(HttpStatusCode.Forbidden)
                {
                    Content = new StringContent(f.Data)
                };
            }

            await gameRepository.Update(game).ConfigureAwait(false);
            return new HttpResponseMessage(HttpStatusCode.OK);
        }

        [HttpPost, Route("game/{id:guid}/estimation")]
        public HttpResponseMessage Estimate(Guid id, [FromBody] EstimationModel estimationModel)
        {
            lock (estimationLock)
            {
                var game = gameRepository.Get(id).Result;
                var player = Thread.CurrentPrincipal.Identity.Name;

                var estimation = new Estimation(estimationModel.Value, player);

                if (game.Estimate(estimation) is Failure<string> f)
                {
                    return new HttpResponseMessage(HttpStatusCode.Forbidden)
                    {
                        Content = new StringContent(f.Data)
                    };
                }

                gameRepository.Update(game).Wait();
                return new HttpResponseMessage(HttpStatusCode.OK);
            }
        }

        [HttpGet, Route("game/{id:guid}")]
        public Task<Game> GetGame(Guid id)
        {
            return gameRepository.Get(id);
        }
    }
}