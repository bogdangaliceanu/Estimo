using System;

namespace Estimo
{
    public class Estimation
    {
        public EstimationValue Value { get; }
        public string Player { get; }
        public DateTimeOffset Timestamp { get; }

        public Estimation(EstimationValue value, string player)
            : this(value, player, DateTimeOffset.Now)
        {
        }

        public Estimation(EstimationValue value, string player, DateTimeOffset timestamp)
        {
            this.Value = value;
            this.Player = player;
            this.Timestamp = timestamp;
        }
    }
}
