# Flows - State management with Solidjs following Flux Architecture

## Install

```bash
npm i @techmely/flows
yarn add @techmely/flows
pnpm add @techmely/flows
bun add @techmely/flows
```

## Why

In Solidjs, global state management is already solved. But we have to face two problems:

1. Cross-request state pollution in SSR mode
   Read detail in https://vuejs.org/guide/scaling-up/ssr.html#cross-request-state-pollution
2. Scale Management
   We want to structure the store with more architecture to avoid mistakes as much as possible. So I decided make a lib more like Flux Architecture - Example is Redux
3. Inject the plugins like Persist Storage, Background Jobs....


## Usage

### Boundary Provider

```tsx
type AuthState = {
    user?: string;
    accessToken?: string;
};
const initialAuthStore: AuthState = {
  accessToken: "token",
  user: undefined,
};
const authFlowStore = defineFlowStore(initialAuthStore, {
  actions: (setState) => ({
    set: setState,
    updateUser: (user: string) => setState("user", user),
    async login(info) {
      await sleep(300);
      setState({
        user: "New User",
        accessToken: "New AccessToken",
      });
    },
  }),
  getter: (state) => ({
    get: () => state,
    user: () => state.user,
  }),
});
```

```

ENJOY!

## License

MIT © [harrytran998](https://github.com/harrytran998)
