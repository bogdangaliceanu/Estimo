using System;
using System.Collections.Generic;
using System.Linq;

namespace Estimo
{
    public class Round
    {
        public string Subject { get; }

        private readonly Dictionary<string, Estimation> estimationsByPlayer;
        public IEnumerable<Estimation> Estimations { get { return estimationsByPlayer.Values; } }

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
            this.estimationsByPlayer = estimations.ToDictionary(e => e.Player, e => e);
            this.StartedAt = startedAt;
            this.FinishedAt = finishedAt;
            this.Consensus = consensus;
        }

        internal bool TryGetEstimation(string player, out Estimation estimation)
        {
            return this.estimationsByPlayer.TryGetValue(player, out estimation);
        }

        internal void Estimate(Estimation estimation)
        {
            this.estimationsByPlayer.Add(estimation.Player, estimation);
        }

        internal void Finish(EstimationValue consensus)
        {
            this.FinishedAt = DateTimeOffset.Now;
            this.Consensus = consensus;
        }
    }
}
