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
            var serialized = JsonConvert.SerializeObject(game);
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
                return JsonConvert.DeserializeObject<Game>(serialized);
            }
        }

        public Task Update(Game game)
        {
            throw new NotImplementedException();
        }
    }
}