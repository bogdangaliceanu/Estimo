interface Failure<T> {
    kind: 'failure';
    data: T;
}

interface Success<T> {
    kind: 'success';
    data: T;
}

export type Result<TSuccess, TFailure> = Success<TSuccess> | Failure<TFailure>;