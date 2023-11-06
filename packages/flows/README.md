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


## Usage

### Boundary Provider

Before using `@techmely/flows`, we must wrap our app with `FlowStateProvider`, ideally at the root.

```tsx
import { FlowStateProvider } from '@techmely/flows';

<FlowStateProvider>
  <App />
</FlowStateProvider>
```

FlowStateProvider will manage the life-cycles and instances of the flows.


### Flows

A flow is the synonym of createSignal: a fundamental "global" state. It shares almost the same syntax:

```ts
import { defineFlowState } from '@techmely/flows';

const countFlow = defineFlowState(0);
```


But unlike signals, flows are lazily-evaluated, so you won't get the accessor nor the setter of a flow without the use of `useFlowState`.

```tsx
import { useFlowState } from '@techmely/flows';

function Counter() {
  const [count, setCount] = useFlowState(countFlow);

  function increment() {
    setCount((c) => c + 1);
  }

  return (
    <>
      <h1>Count: {count()}</h1>
      <button onClick={increment}>Increment</button>
    </>
  );
}
```


Since flow instances are managed by FlowStateProvider, unmounting the component that uses useFlow won't reset the state of the given flow, and the state of the given flow is also shared by similar components, which means that if one component updates a given flow, the other components that uses it will also receive the same update.

and by lazily-evaluated, you can also use lazy initial values

```ts
const lazyFlow = defineFlowState(() => initValue());
```


### Computed Flows

Flows themselves are great, just like signals, but how do we make computed Flows? We can use `computedFlow` which is also similar to createMemo with some significant difference.

```ts
import { computedFlow } from 'solid-Flow';

const doubleCountFlow = computedFlow(
  (ctx) => ctx.get(countFlow) * 2,
);
```

computedFlow receives a context object that helps us read values from other Flows and computed Flows, this also tracks the Flows for value updates.

Like createFlow, we use useFlow to get the accessor from computedFlow

```tsx
import { useFlowState } from '@techmely/flows';

function DoubleCounter() {
  const doubleCount = useFlowState(doubleCountFlow);

  return (
    <h1>Double Count: {doubleCount()}</h1>
  );
}

```

Just like createMemo, you can pass an initial value and/or receive the previously computed value

```ts
const upwardsCount = computedFlow((ctx, pre) => {
  const current = ctx.get(countFlow);
  if (pre < current) {
    return current;
  }
  return pre;
}, {
  initValue: 10, // can also be lazy i.e. () => Math.random() * 69
});

```


### Proxy Flows

Proxy Flows are Flows that are stateless Flows that you can use to read from and write to Flows.

Since proxy Flows are stateless, it doesn't have or need an initial value, it cannot track its previous value nor it doesn't have to receive a value for its setter.

Here's an example that emulates a reducer

```tsx
import { type AnyAction, withMatcher } from "@techmely/flows";
import { create as mutative } from "mutative";

type AuthState = {
  user?: User;
  accessToken?: string;
  isLoading: boolean;
};

const initialAuthStore: AuthState = {
  accessToken: undefined,
  user: undefined,
  isLoading: false
};

const authFlow = defineFlowState(() => initialAuthStore);

/************ ACTIONS */
const updateAccessToken = withMatcher((payload: string) => ({
  type: "auth/updateAccessToken",
  payload,
}));

const updateUser = withMatcher((payload: AuthState["user"]) => ({
  type: "auth/updateUser",
  payload,
}));

const updateLoading = withMatcher((payload: boolean) => ({
  type: "auth/updateLoading",
  payload,
}));

/************ REDUCER */
const authReducer = (state: AuthState, action: AnyAction) => {
  if (updateAccessToken.match(action)) {
    return mutative(state, (draft) => {
      draft.accessToken = action.payload;
    });
  }
  if (updateUser.match(action)) {
    return mutative(state, (draft) => {
      draft.user = action.payload;
    });
  }
  return state;
};

const actions = {
  updateAccessToken,
  updateUser,
};

type AuthAction = AnyAction<`auth/${keyof typeof actions}`>;

const reducerAuthFlow = defineProxyFlowState({
  get(ctx) {
    return ctx.get(authFlow);
  },
  set(ctx, action: AnyAction) {
    ctx.set(authFlow, authReducer(ctx.get(authFlow), action));
  },
});

/************ EFFECTS */

export async function authSignInWithSomething(
  dispatch: (action: AuthAction) => void,
  payload: { options: SignInOptions },
) {
  dispatch({ type: "auth/updateLoading", payload: true });

  /** ASYNC LOGIC HERE */
  const output = {
    token: 'token',
    user: 'user'
  }

  dispatch({ type: "auth/updateAccessToken", payload: output.token });
  dispatch({ type: "auth/updateUser", payload: output.user });
  dispatch({ type: "auth/updateLoading", payload: false });
  navigate("/some-where");
}

function useAuthStore() {
  return useFlowState(reducerFlow);
}


const Component: Component = () => {
  const [auth, dispatch] = useAuthStore();

  createEffect(() => {
    console.log(auth().user)
  })

  const handleLogin = async () => {
    await authSignInWithSomething()
  }

  return <div>
    ....
  </div>
}

```

ENJOY!

## License

MIT © [harrytran998](https://github.com/harrytran998)
