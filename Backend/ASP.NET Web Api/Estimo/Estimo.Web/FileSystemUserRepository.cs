using System.IO;
using System.Threading.Tasks;
using Newtonsoft.Json;

namespace Estimo.Web
{
    public class FileSystemUserRepository : IUserRepository
    {
        private readonly string directory;

        public FileSystemUserRepository(string directory)
        {
            this.directory = directory;
            if (!Directory.Exists(directory))
            {
                Directory.CreateDirectory(directory);
            }
        }

        public async Task<User> Get(string username)
        {
            var filePath = Path.Combine(directory, $"{username}.json");
            if (!File.Exists(filePath))
            {
                return null;
            }

            using (var file = File.OpenRead(filePath))
            using (var reader = new StreamReader(file))
            {
                var serialized = await reader.ReadToEndAsync();
                return JsonConvert.DeserializeObject<User>(serialized);
            }
        }

        public Task Save(User user)
        {
            var serialized = JsonConvert.SerializeObject(user);
            var filePath = Path.Combine(directory, $"{user.Username.ToString()}.json");
            using (var file = File.OpenWrite(filePath))
            {
                file.SetLength(0);
                using (var writer = new StreamWriter(file))
                {
                    return writer.WriteAsync(serialized);
                }
            }
        }
    }
}