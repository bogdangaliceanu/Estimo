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

                public static EstimationModel Build(Estimation estimation)
                {
                    return new EstimationModel
                    {
                        Player = estimation.Player,
                        Value = estimation.Value
                    };
                }
            }

            public static RoundModel Build(Round round)
            {
                return new RoundModel
                {
                    Subject = round.Subject,
                    Estimations = round.Estimations.Select(EstimationModel.Build),
                    Consensus = round.Consensus
                };
            }
        }

        public static GameModel Build(Game game)
        {
            return new GameModel
            {
                Id = game.Id,
                Initiator = game.Initiator,
                Rounds = game.Rounds.Select(RoundModel.Build)
            };
        }
    }
}