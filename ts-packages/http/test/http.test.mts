import { afterEach, beforeEach, describe, expect, it, test, vi } from "vitest";
import { Http } from "../src";
import { type CreateTestServer, createTestServer } from "./setup/server.setup";

describe("Main test", () => {
  let testServer: CreateTestServer;
  beforeEach(async () => {
    testServer = await createTestServer();
  });

  afterEach(() => {
    vi.resetAllMocks();
    testServer.app.close();
  });

  test("Http", () => {
    testServer.app.get("/api", (res, req) => {
      const result = JSON.stringify({ method: req.getMethod() });
      res.writeStatus(String(200)).end(result);
    });
    // const { ok } = await http;
  });
});
