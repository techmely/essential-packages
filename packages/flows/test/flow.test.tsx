import { sleep } from "@techmely/utils/promises";
import { describe, expect, it } from "vitest";

import { defineFlowStore } from "../src";

describe("FlowStateProvider", () => {
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

  it("Test basic function", async () => {
    const { state, getters, actions } = authFlowStore;
    expect(state.accessToken).toBe("token");
    expect(getters.get()).toStrictEqual(initialAuthStore);
    actions.updateUser("Hello World");
    expect(state.user).not.toBe(undefined);
    expect(getters.get()).toStrictEqual({ user: "Hello World", accessToken: "token" });
    await actions.login("");
    expect(getters.get()).toStrictEqual({ user: "New User", accessToken: "New AccessToken" });
    expect(state).toStrictEqual({ user: "New User", accessToken: "New AccessToken" });
  });
});
