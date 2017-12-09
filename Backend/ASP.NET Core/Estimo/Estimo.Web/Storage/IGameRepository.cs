using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Estimo.Web.Storage
{
    public interface IGameRepository
    {
        Task<IEnumerable<Game>> Get();
        Task<IEnumerable<Guid>> GetIds();
        Task<Game> Get(Guid id);
        Task Add(Game game);
        Task Update(Game game);
    }
}