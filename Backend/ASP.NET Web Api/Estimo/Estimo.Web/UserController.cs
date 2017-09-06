using System.Net;
using System.Net.Http;
using System.Security.Cryptography;
using System.Text;
using System.Threading.Tasks;
using System.Web.Http;
using System.Web.Http.Cors;

namespace Estimo.Web
{
    public class UserController : ApiController
    {
        private readonly IUserRepository userRepository;

        public UserController(IUserRepository userRepository)
        {
            this.userRepository = userRepository;
        }

        [HttpPost, Route("signup")]
        public async Task<HttpResponseMessage> SignUp([FromBody] UserModel userModel)
        {
            var user = new User
            {
                Username = userModel.Username,
                PasswordHash = HashPassword(userModel.Password)
            };

            var existingUser = await this.userRepository.Get(user.Username).ConfigureAwait(false);
            if (existingUser != null)
            {
                return new HttpResponseMessage(HttpStatusCode.Conflict);
            }

            await this.userRepository.Save(user).ConfigureAwait(false);

            return new HttpResponseMessage(HttpStatusCode.Created);
        }

        [HttpPost, Route("login")]
        public async Task<HttpResponseMessage> LogIn([FromBody] UserModel userModel)
        {
            var user = new User
            {
                Username = userModel.Username,
                PasswordHash = HashPassword(userModel.Password)
            };

            var existingUser = await this.userRepository.Get(user.Username).ConfigureAwait(false);
            if (existingUser == null || existingUser.PasswordHash != user.PasswordHash)
            {
                return new HttpResponseMessage(HttpStatusCode.Unauthorized);
            }

            return new HttpResponseMessage(HttpStatusCode.OK);
        }

        private static string HashPassword(string password)
        {
            using (var sha256 = new SHA256Managed())
            {
                var hash = sha256.ComputeHash(Encoding.UTF8.GetBytes(password));
                return Encoding.UTF8.GetString(hash);
            }
        }
    }
}