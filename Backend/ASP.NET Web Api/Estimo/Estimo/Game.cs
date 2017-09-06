using System;
using System.Collections.Generic;
using System.Linq;

namespace Estimo
{
    public class Game
    {
        public Guid Id { get; }

        private readonly List<Round> rounds;
        public IEnumerable<Round> Rounds { get { return rounds; } }

        public Game()
            : this(Guid.NewGuid(), Enumerable.Empty<Round>())
        {
        }

        public Game(Guid id, IEnumerable<Round> rounds)
        {
            this.Id = id;
            this.rounds = rounds.ToList();
        }

        public void NewRound(string subject)
        {
            var currentRound = this.rounds.LastOrDefault();
            if (currentRound != null && !currentRound.FinishedAt.HasValue)
            {
                throw new InvalidOperationException("Cannot start a new round when one is in progress");
            }

            this.rounds.Add(new Round(subject));
        }

        public void Estimate(Estimation estimation)
        {
            var currentRound = this.rounds.LastOrDefault();
            if (currentRound == null)
            {
                throw new InvalidOperationException("Cannot estimate without first starting a round");
            }

            currentRound.Estimate(estimation);
        }

        public void FinishCurrentRound(EstimationValue consensus)
        {
            var currentRound = this.rounds.LastOrDefault();
            if (currentRound == null)
            {
                throw new InvalidOperationException("No round is in progress");
            }

            currentRound.Finish(consensus);
        }
    }
}
