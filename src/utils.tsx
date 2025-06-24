export function* range(n: number): Generator<number, void, unknown> {
  for (let i = 0; i < n; i++) {
    yield i;
  }
}

// NB: React does not like map on iterables
export function* map<T, U>(iterable: Iterable<T>, fn: (value: T) => U): Generator<U, void, unknown> {
  for (const value of iterable) {
    yield fn(value);
  }
}

