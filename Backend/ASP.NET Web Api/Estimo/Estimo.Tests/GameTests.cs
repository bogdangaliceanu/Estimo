using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Xunit;

namespace Estimo.Tests
{
    public class GameTests
    {
        [Fact]
        public void CanStartNewRound()
        {
            var game = new Game();

            const string subject = "subj";
            game.NewRound(subject);

            var round = game.Rounds.Single();
            Assert.Equal(subject, round.Subject);
        }

        [Fact]
        public void CanFinishCurrentRound()
        {
            var game = new Game();
            game.NewRound("subj");

            game.FinishCurrentRound(EstimationValue.One);

            var round = game.Rounds.Single();
            Assert.Equal(true, round.FinishedAt.HasValue);
        }

        [Fact]
        public void CanEstimateInCurrentRound()
        {
            var game = new Game();
            game.NewRound("subj");
            var e = new Estimation(EstimationValue.One, "p1");
            game.Estimate(e);

            var round = game.Rounds.Single();
            Assert.Equal(e, round.Estimations.Single());
        }

        [Fact]
        public void CannotStartNewRoundWhenOneIsInProgress()
        {
            var game = new Game();
            game.NewRound("s1");

            Assert.Throws(
                typeof(InvalidOperationException),
                () => game.NewRound("s2")
            );
        }

        [Fact]
        public void CannotEstimateWithoutARoundInProgress()
        {
            var game = new Game();

            Assert.Throws(
                typeof(InvalidOperationException),
                () => game.Estimate(new Estimation(EstimationValue.One, "p1"))
            );
        }

        [Fact]
        public void CannotFinishARoundWithoutARoundInProgress()
        {
            var game = new Game();

            Assert.Throws(
                typeof(InvalidOperationException),
                () => game.FinishCurrentRound(EstimationValue.One)
            );
        }
    }
}
