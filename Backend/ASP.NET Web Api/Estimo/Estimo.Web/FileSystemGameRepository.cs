using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;
using Newtonsoft.Json;

namespace Estimo.Web
{
    public class FileSystemGameRepository : IGameRepository
    {
        private class GameDto
        {
            public Guid Id { get; set; }
            public string Initiator { get; set; }
            public IEnumerable<RoundDto> Rounds { get; set; }
        }

        private class RoundDto
        {
            public string Subject { get; set; }
            public IEnumerable<EstimationDto> Estimations { get; set; }
            public DateTimeOffset StartedAt { get; set; }
            public DateTimeOffset? FinishedAt { get; set; }
            public EstimationValue? Consensus { get; set; }
        }

        private class EstimationDto
        {
            public EstimationValue Value { get; set; }
            public string Player { get; set; }
            public DateTimeOffset Timestamp { get; set; }
        }

        private readonly string directory;

        public FileSystemGameRepository(string directory)
        {
            this.directory = directory;
            if (!Directory.Exists(directory))
            {
                Directory.CreateDirectory(directory);
            }
        }

        public Task Add(Game game)
        {
            var dto = ToDto(game);
            var serialized = JsonConvert.SerializeObject(dto);
            var filePath = Path.Combine(directory, $"{game.Id.ToString()}.json");
            using (var file = File.OpenWrite(filePath))
            {
                file.SetLength(0);
                using (var writer = new StreamWriter(file))
                {
                    return writer.WriteAsync(serialized);
                }
            }
        }

        public async Task<IEnumerable<Game>> Get()
        {
            var ids = Directory.EnumerateFiles(this.directory)
                .Select(Path.GetFileNameWithoutExtension)
                .Select(Guid.Parse);

            return await Task.WhenAll(ids.Select(Get));
        }

        public async Task<Game> Get(Guid id)
        {
            var filePath = Path.Combine(directory, $"{id.ToString()}.json");
            using (var file = File.OpenRead(filePath))
            using (var reader = new StreamReader(file))
            {
                var serialized = await reader.ReadToEndAsync();
                var dto = JsonConvert.DeserializeObject<GameDto>(serialized);
                return FromDto(dto);
            }
        }

        public Task Update(Game game)
        {
            var dto = ToDto(game);
            var serialized = JsonConvert.SerializeObject(dto);
            var filePath = Path.Combine(directory, $"{game.Id.ToString()}.json");
            using (var file = File.OpenWrite(filePath))
            {
                file.SetLength(0);
                using (var writer = new StreamWriter(file))
                {
                    return writer.WriteAsync(serialized);
                }
            }
        }

        private static GameDto ToDto(Game g)
        {
            return new GameDto
            {
                Id = g.Id,
                Initiator = g.Initiator,
                Rounds = g.Rounds.Select(ToDto)
            };
        }

        private static Game FromDto(GameDto g)
        {
            return new Game(g.Id, g.Rounds.Select(FromDto), g.Initiator);
        }

        private static RoundDto ToDto(Round r)
        {
            return new RoundDto
            {
                Consensus = r.Consensus,
                Estimations = r.Estimations.Select(ToDto),
                FinishedAt = r.FinishedAt,
                StartedAt = r.StartedAt,
                Subject = r.Subject
            };
        }

        private static Round FromDto(RoundDto r)
        {
            return new Round(r.Subject, r.Estimations.Select(FromDto), r.StartedAt, r.FinishedAt, r.Consensus);
        }

        private static EstimationDto ToDto(Estimation e)
        {
            return new EstimationDto
            {
                Player = e.Player,
                Timestamp = e.Timestamp,
                Value = e.Value
            };
        }

        private static Estimation FromDto(EstimationDto e)
        {
            return new Estimation(e.Value, e.Player, e.Timestamp);
        }
    }
}