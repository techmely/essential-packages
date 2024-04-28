import { QueryClient, QueryClientProvider, useSuspenseQuery } from "@tanstack/react-query";
import { renderHook, cleanup, render, waitFor } from "@testing-library/react";
import React, { type ReactNode, useEffect } from "react";
import { afterEach, describe, expect, it, vi } from "vitest";
import { withFallback } from "../src/WithFallback";

const Component = withFallback(
  ({ count, onMount }: { count?: number; onMount?: () => void }) => {
    // biome-ignore lint/correctness/useExhaustiveDependencies: Ignore this case
    useEffect(() => {
      onMount?.();
    }, []);

    return count;
  },
  { Loading: ({ count }) => `loading ${count}` },
);

const ComponentThatSuspends = withFallback(
  ({ count, onMount }: { count?: number; onMount?: () => void; onFallbackMount?: () => void }) => {
    useSuspenseQuery({
      queryFn: () => new Promise((r) => setTimeout(() => r("some value"), 50)),
      queryKey: ["ComponentThatSuspends"],
    });

    // biome-ignore lint/correctness/useExhaustiveDependencies: Ignore this case
    useEffect(() => {
      onMount?.();
    }, []);

    return count;
  },
  {
    Loading: ({ count, onFallbackMount }) => {
      // biome-ignore lint/correctness/useExhaustiveDependencies: Ignore this case
      useEffect(() => {
        onFallbackMount?.();
      }, []);
      return `loading-${count}`;
    },
  },
);

const ComponentThatThrows = withFallback(
  ({
    count,
    onMount,
  }: {
    count?: number;
    onMount?: () => void;
    onErrorFallbackMount?: () => void;
  }) => {
    // biome-ignore lint/correctness/useExhaustiveDependencies: Ignore this case
    useEffect(() => {
      onMount?.();
    }, []);
    throw new Error("ERROR MESSAGE");
  },
  {
    Loading: ({ count }) => `loading-${count}`,
    ErrorComp: ({ count, error, onErrorFallbackMount }) => {
      // biome-ignore lint/correctness/useExhaustiveDependencies: Ignore this case
      useEffect(() => {
        onErrorFallbackMount?.();
      }, []);
      return `error-${error.message}-${count}`;
    },
  },
);

const ComponentThatThrows2 = withFallback(
  ({
    count,
    onMount,
  }: {
    count?: number;
    onMount?: () => void;
    onErrorFallbackMount?: () => void;
  }) => {
    // biome-ignore lint/correctness/useExhaustiveDependencies: Ignore this case
    useEffect(() => {
      onMount?.();
    }, []);
    throw new Error("ERROR MESSAGE");
  },
  {
    Loading: ({ count }) => `Loading - ${count}`,
    ErrorComp: "error fallback string",
  },
);

const OuterComponent = withFallback(
  ({ children }: { children: ReactNode }) => {
    return children;
  },
  { Loading: () => "outer loading", ErrorComp: () => "outer error" },
);

describe("Suspense", () => {
  afterEach(() => {
    cleanup();
  });

  it("Works", () => {
    const onMount = vi.fn();
    const { container } = render(<Component count={69} onMount={onMount} />);
    expect(container.innerHTML).toBe("69");
    expect(onMount).toHaveBeenCalledOnce();
  });

  it("Should not re-mount on props update", () => {
    const onMount = vi.fn();
    let result = render(<Component count={25} onMount={onMount} />);
    expect(result.container.innerHTML).toBe("25");
    expect(onMount).toHaveBeenCalledOnce();

    result = render(<Component count={30} onMount={onMount} />, { container: result.container });
    expect(result.container.innerHTML).toBe("30");
    expect(onMount).toHaveBeenCalledOnce();
  });

  it("Should show loading fallback", async () => {
    const queryClient = new QueryClient();
    const onMount = vi.fn();
    const result = render(
      <QueryClientProvider client={queryClient}>
        <ComponentThatSuspends count={69} onMount={onMount} />
      </QueryClientProvider>,
    );
    expect(result.container.innerHTML).toBe("loading-69");
    await waitFor(() => expect(onMount).toHaveBeenCalledOnce());
    expect(result.container.innerHTML).toBe("69");
  });

  it("Should update props inside the fallback, without re-mounting the fallback component", async () => {
    const queryClient = new QueryClient();
    const onMount = vi.fn();
    const onFallbackMount = vi.fn();
    let result = render(
      <QueryClientProvider client={queryClient}>
        <ComponentThatSuspends count={69} onMount={onMount} onFallbackMount={onFallbackMount} />
      </QueryClientProvider>,
    );
    expect(result.container.innerHTML).toBe("loading-69");
    expect(onFallbackMount).toHaveBeenCalledOnce();
    result = render(
      <QueryClientProvider client={queryClient}>
        <ComponentThatSuspends count={696} onMount={onMount} onFallbackMount={onFallbackMount} />
      </QueryClientProvider>,
      {
        container: result.container,
      },
    );
    expect(result.container.innerHTML).toBe("loading-696");
    expect(onFallbackMount).toHaveBeenCalledOnce();

    await waitFor(() => expect(onMount).toHaveBeenCalledOnce());
    expect(result.container.innerHTML).toBe("696");
  });

  it("Should should error fallback component", () => {
    const onMount = vi.fn();
    const result = render(<ComponentThatThrows count={69} onMount={onMount} />);
    expect(result.container.innerHTML).toBe("error-ERROR MESSAGE-69");
    expect(onMount).toBeCalledTimes(0);
  });

  it("Should show error fallback string", () => {
    const onMount = vi.fn();
    const result = render(<ComponentThatThrows2 count={69} onMount={onMount} />);
    expect(result.container.innerHTML).toBe("error fallback string");
    expect(onMount).toBeCalledTimes(0);
  });

  it("Should trap the error inside the inner error boundary", () => {
    const onMount = vi.fn();
    const result = render(
      <OuterComponent>
        <ComponentThatThrows count={69} onMount={onMount} />
      </OuterComponent>,
    );
    expect(result.container.innerHTML).toBe("error-ERROR MESSAGE-69");
    expect(onMount).toBeCalledTimes(0);
  });

  it("Should update props inside the error fallback, without remounting the fallback component", () => {
    const onMount = vi.fn();
    const onErrorFallbackMount = vi.fn();
    let result = render(
      <ComponentThatThrows
        count={69}
        onMount={onMount}
        onErrorFallbackMount={onErrorFallbackMount}
      />,
    );
    expect(result.container.innerHTML).toBe("error-ERROR MESSAGE-69");
    expect(onMount).toBeCalledTimes(0);
    expect(onErrorFallbackMount).toHaveBeenCalledOnce();

    result = render(
      <ComponentThatThrows
        count={969}
        onMount={onMount}
        onErrorFallbackMount={onErrorFallbackMount}
      />,
      {
        container: result.container,
      },
    );
    expect(result.container.innerHTML).toBe("error-ERROR MESSAGE-969");
    expect(onMount).toBeCalledTimes(0);
    expect(onErrorFallbackMount).toHaveBeenCalledOnce();
  });
});
