using System.Threading.Tasks;

namespace Estimo.Web
{
    public interface IUserRepository
    {
        Task Save(User user);
        Task<User> Get(string username);
    }
}