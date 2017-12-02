namespace Estimo
{
    public interface IGameOperationResult
    {
    }

    public class Success : IGameOperationResult
    {
        public static Success Instance { get; } = new Success();

        private Success() { }
    }

    public class Failure<T> : IGameOperationResult
    {
        public T Data { get; }

        public Failure(T data)
        {
            this.Data = data;
        }
    }
}
