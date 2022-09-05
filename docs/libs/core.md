# core

### `observablify`

```typescript
function observablify<A extends Arguments, R extends Results = []>(
  fn: (...args: [...A, ErrorCallback<R>]) => any
): (...args: A) => Observable<VoidOrItemOrItems<R>>;
```

### `watchify`

```typescript
function watchify<A extends Arguments, R extends Results>(
  fn: (...args: [...A, Callback<R>]) => any,
  { closeOnUnsubscribe: closeOnUnsubscribe }?: { closeOnUnsubscribe?: boolean }
): (...args: A) => Observable<VoidOrItemOrItems<R>>;
```
