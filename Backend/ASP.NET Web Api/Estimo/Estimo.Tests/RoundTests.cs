using System;
using System.Linq;
using Xunit;

namespace Estimo.Tests
{
    public class RoundTests
    {
        [Fact]
        public void DifferentPlayersCanAddEstimates()
        {
            var round = new Round("subj");

            var e1 = new Estimation(EstimationValue.One, "p1");
            round.Estimate(e1);
            var e2 = new Estimation(EstimationValue.One, "p2");
            round.Estimate(e2);

            Assert.True(round.Estimations.SequenceEqual(new[] { e1, e2 }));
        }

        [Fact]
        public void SamePlayersCanOnlyAddOneEstimate()
        {
            var round = new Round("subj");

            const string player = "p1";
            round.Estimate(new Estimation(EstimationValue.One, player));

            Assert.Throws(
                typeof(InvalidOperationException),
                () => round.Estimate(new Estimation(EstimationValue.One, player))
            );
        }

        [Fact]
        public void CannotAddEstimateToFinishedRound()
        {
            var round = new Round("subj");

            round.Estimate(new Estimation(EstimationValue.One, "p1"));
            round.Finish(EstimationValue.One);

            Assert.Throws(
                typeof(InvalidOperationException),
                () => round.Estimate(new Estimation(EstimationValue.One, "p2"))
            );
        }
    }
}
