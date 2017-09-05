using System;

namespace Estimo
{
    public class Estimation
    {
        public string CardValue { get; }
        public string Player { get; }
        public DateTimeOffset Timestamp { get; }

        public Estimation(string cardValue, string player)
            : this(cardValue, player, DateTimeOffset.Now)
        {
        }

        public Estimation(string cardValue, string player, DateTimeOffset timestamp)
        {
            this.CardValue = cardValue;
            this.Player = player;
            this.Timestamp = timestamp;
        }
    }
}
