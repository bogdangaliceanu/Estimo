using System;
using System.Net;
using System.Security.Cryptography;
using System.Text;
using System.Threading.Tasks;
using Estimo.Web.Models;
using Microsoft.AspNetCore.Mvc;
using Estimo.Web.Storage;
using Microsoft.AspNetCore.Authorization;
using System.Security.Claims;
using System.IdentityModel.Tokens.Jwt;
using Microsoft.Extensions.Options;
using Microsoft.IdentityModel.Tokens;

namespace Estimo.Web.Controllers
{
    [AllowAnonymous]
    [Route("user")]
    public class UserController : Controller
    {
        private readonly IUserRepository userRepository;
        private readonly JwtSettings jwtSettings;

        public UserController(IUserRepository userRepository, IOptions<JwtSettings> jwtSettings)
        {
            this.userRepository = userRepository;
            this.jwtSettings = jwtSettings.Value;
        }

        [HttpPost, Route("signup")]
        public async Task<IActionResult> SignUp([FromBody] UserModel userModel)
        {
            var user = new User
            {
                Username = userModel.Username,
                PasswordHash = HashPassword(userModel.Password)
            };

            var existingUser = await this.userRepository.Get(user.Username).ConfigureAwait(false);
            if (existingUser != null)
            {
                return StatusCode((int)HttpStatusCode.Conflict);
            }

            await this.userRepository.Save(user).ConfigureAwait(false);

            return Created(string.Empty, null);
        }

        [HttpPost, Route("login")]
        public async Task<IActionResult> LogIn([FromBody] UserModel userModel)
        {
            var user = new User
            {
                Username = userModel.Username,
                PasswordHash = HashPassword(userModel.Password)
            };

            var existingUser = await this.userRepository.Get(user.Username).ConfigureAwait(false);
            if (existingUser == null || existingUser.PasswordHash != user.PasswordHash)
            {
                return Unauthorized();
            }

            var claims = new[]
            {
                new Claim(JwtRegisteredClaimNames.Sub, user.Username),
                new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString())
            };

            var token = new JwtSecurityToken
            (
                issuer: jwtSettings.Issuer,
                audience: jwtSettings.Audience,
                claims: claims,
                expires: DateTime.UtcNow.AddDays(60),
                notBefore: DateTime.UtcNow,
                signingCredentials: new SigningCredentials(new SymmetricSecurityKey(Encoding.UTF8.GetBytes(jwtSettings.SigningKey)), SecurityAlgorithms.HmacSha256)
            );

            return Ok(new JwtSecurityTokenHandler().WriteToken(token));
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