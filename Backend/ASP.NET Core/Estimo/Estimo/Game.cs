using System;
using System.Collections.Generic;
using System.Linq;

namespace Estimo
{
    public class Game
    {
        public Guid Id { get; }

        public string Initiator { get; }
        private readonly List<Round> rounds;
        public IEnumerable<Round> Rounds { get { return rounds; } }

        public Game(string initiator)
            : this(Guid.NewGuid(), Enumerable.Empty<Round>(), initiator)
        {
        }

        public Game(Guid id, IEnumerable<Round> rounds, string initiator)
        {
            this.Id = id;
            this.rounds = rounds.ToList();
            this.Initiator = initiator;
        }

        public IGameOperationResult NewRound(string subject, string player)
        {
            if (player != this.Initiator)
            {
                return new Failure<string>("A round can only be started by the game's initiator");
            }

            var currentRound = this.rounds.LastOrDefault();
            if (currentRound != null && !currentRound.FinishedAt.HasValue)
            {
                return new Failure<string>("Cannot start a new round when one is in progress");
            }

            this.rounds.Add(new Round(subject));
            return Success.Instance;
        }

        public IGameOperationResult Estimate(Estimation estimation)
        {
            var currentRound = this.rounds.LastOrDefault();
            if (currentRound == null)
            {
                return new Failure<string>("Cannot estimate without first starting a round");
            }
            if (currentRound.FinishedAt.HasValue)
            {
                return new Failure<string>($"The round regarding {currentRound.Subject} is over");
            }
            if (currentRound.TryGetEstimation(estimation.Player, out _))
            {
                return new Failure<string>($"{estimation.Player} has already estimated in this round");
            }

            currentRound.Estimate(estimation);
            return Success.Instance;
        }

        public IGameOperationResult FinishCurrentRound(EstimationValue consensus, string player)
        {
            if (player != this.Initiator)
            {
                return new Failure<string>("A round can only be finished by the game's initiator");
            }

            var currentRound = this.rounds.LastOrDefault();
            if (currentRound == null)
            {
                return new Failure<string>("No round is in progress");
            }

            currentRound.Finish(consensus);
            return Success.Instance;
        }
    }
}
