using System;
using System.Collections.Generic;
using System.Linq;

namespace Estimo
{
    public class Round
    {
        public string Subject { get; }

        private readonly Dictionary<string, Estimation> estimations;
        public IEnumerable<Estimation> Estimations { get { return estimations.Values; } }

        public DateTimeOffset StartedAt { get; }
        public DateTimeOffset? FinishedAt { get; private set; }

        public EstimationValue? Consensus { get; private set; }

        public Round(string subject)
            : this(subject, Enumerable.Empty<Estimation>(), DateTimeOffset.Now, null, null)
        {
        }

        public Round(string subject, IEnumerable<Estimation> estimations, DateTimeOffset startedAt, DateTimeOffset? finishedAt, EstimationValue? consensus)
        {
            this.Subject = subject;
            this.estimations = estimations.ToDictionary(e => e.Player, e => e);
            this.StartedAt = startedAt;
            this.FinishedAt = finishedAt;
            this.Consensus = consensus;
        }

        public void Estimate(Estimation estimation)
        {
            if (this.FinishedAt.HasValue)
            {
                throw new InvalidOperationException($"The round regarding {this.Subject} is over");
            }
            if (this.estimations.ContainsKey(estimation.Player))
            {
                throw new InvalidOperationException($"{estimation.Player} has already estimated in this round");
            }
            this.estimations.Add(estimation.Player, estimation);
        }

        public void Finish(EstimationValue consensus)
        {
            this.FinishedAt = DateTimeOffset.Now;
            this.Consensus = consensus;
        }
    }
}
