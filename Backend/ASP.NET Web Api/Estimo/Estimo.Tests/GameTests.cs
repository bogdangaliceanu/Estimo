using System;
using System.Linq;
using Xunit;

namespace Estimo.Tests
{
    public class GameTests
    {
        [Fact]
        public void CanStartNewRound()
        {
            const string player = "p1";
            var game = new Game(player);

            const string subject = "subj";
            Assert.IsType(typeof(Success), game.NewRound(subject, player));

            var round = game.Rounds.Single();
            Assert.Equal(subject, round.Subject);
        }

        [Fact]
        public void CanFinishCurrentRound()
        {
            const string player = "p1";
            var game = new Game(player);
            game.NewRound("subj", player);

            Assert.IsType(typeof(Success), game.FinishCurrentRound(EstimationValue.One, player));

            var round = game.Rounds.Single();
            Assert.Equal(true, round.FinishedAt.HasValue);
        }

        [Fact]
        public void CanEstimateInCurrentRound()
        {
            const string player = "p1";
            var game = new Game(player);
            game.NewRound("subj", player);
            var e = new Estimation(EstimationValue.One, player);

            Assert.IsType(typeof(Success), game.Estimate(e));

            var round = game.Rounds.Single();
            Assert.Equal(e, round.Estimations.Single());
        }

        [Fact]
        public void CannotStartNewRoundWhenOneIsInProgress()
        {
            const string player = "p1";
            var game = new Game(player);
            game.NewRound("s1", player);

            Assert.IsType(typeof(Failure<string>), game.NewRound("s2", player));
        }

        [Fact]
        public void CannotEstimateWithoutARoundInProgress()
        {
            const string player = "p1";
            var game = new Game(player);

            Assert.IsType(typeof(Failure<string>), game.Estimate(new Estimation(EstimationValue.One, player)));
        }

        [Fact]
        public void CannotFinishARoundWithoutARoundInProgress()
        {
            const string player = "p1";
            var game = new Game(player);

            Assert.IsType(typeof(Failure<string>), game.FinishCurrentRound(EstimationValue.One, player));
        }

        [Fact]
        public void DifferentPlayersCanAddEstimates()
        {
            var game = new Game("p1");
            game.NewRound("subj", "p1");

            var e1 = new Estimation(EstimationValue.One, "p1");
            Assert.IsType(typeof(Success), game.Estimate(e1));

            var e2 = new Estimation(EstimationValue.One, "p2");
            Assert.IsType(typeof(Success), game.Estimate(e2));

            Assert.True(game.Rounds.Single().Estimations.SequenceEqual(new[] { e1, e2 }));
        }

        [Fact]
        public void SamePlayersCanOnlyAddOneEstimate()
        {
            const string player = "p1";
            var game = new Game(player);

            game.Estimate(new Estimation(EstimationValue.One, player));

            var result = game.Estimate(new Estimation(EstimationValue.One, player));

            Assert.IsType(typeof(Failure<string>), result);
        }

        [Fact]
        public void CannotAddEstimateToFinishedRound()
        {
            var game = new Game("p1");

            game.Estimate(new Estimation(EstimationValue.One, "p1"));
            game.FinishCurrentRound(EstimationValue.One, "p1");

            var result = game.Estimate(new Estimation(EstimationValue.One, "p2"));

            Assert.IsType(typeof(Failure<string>), result);
        }

        [Fact]
        public void RoundCanOnlyBeFinishedByInitiator()
        {
            var game = new Game("p1");
            game.NewRound("subj", "p1");

            var result = game.FinishCurrentRound(EstimationValue.One, "p2");

            Assert.IsType(typeof(Failure<string>), result);
        }

        [Fact]
        public void RoundCanOnlyBeStartedByInitiator()
        {
            var game = new Game("p1");

            var result = game.NewRound("subj", "p2");

            Assert.IsType(typeof(Failure<string>), result);
        }
    }
}
