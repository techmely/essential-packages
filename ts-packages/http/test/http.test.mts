import { test, describe, it, vi, beforeEach, afterEach, expect } from "vitest";
import { type CreateTestServer, createTestServer } from "./setup/server.setup";
import { Http } from "../src";

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
