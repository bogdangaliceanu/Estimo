using System;
using System.Collections.Generic;
using System.Linq;

namespace Estimo.Web.Models
{
    public class GameModel
    {
        public Guid Id { get; set; }
        public string Initiator { get; set; }
        public IEnumerable<RoundModel> Rounds { get; set; }

        public class RoundModel
        {
            public string Subject { get; set; }
            public EstimationValue? Consensus { get; set; }
            public IEnumerable<EstimationModel> Estimations { get; set; }

            public class EstimationModel
            {
                public string Player { get; set; }
                public EstimationValue? Value { get; set; }
            }
        }

        public static GameModel Build(Game game, string player)
        {
            return new GameModel
            {
                Id = game.Id,
                Initiator = game.Initiator,
                Rounds = game.Rounds.Select(r => HideUnfinishedRoundEstimations(r, player))
            };
        }

        private static RoundModel HideUnfinishedRoundEstimations(Round round, string player)
        {
            return new RoundModel
            {
                Consensus = round.Consensus,
                Estimations = round.Estimations.Select(e => new RoundModel.EstimationModel
                {
                    Player = e.Player,
                    Value = CanValueBeSeen(round, e, player) ? e.Value : (EstimationValue?)null
                }),
                Subject = round.Subject
            };
        }

        private static bool CanValueBeSeen(Round round, Estimation estimation, string player)
        {
            return round.Consensus.HasValue || player == estimation.Player;
        }
    }
}