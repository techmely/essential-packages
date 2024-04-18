import { type TemplatedApp, type us_listen_socket, us_listen_socket_close } from "uWebSockets.js";
import app from "./app.setup";

const hostname = "127.0.0.1";

export type CreateTestServer = {
  app: TemplatedApp;
  token: us_listen_socket | false;
  httpConnection: string;
  wsConnection: string;
};

export function createTestServer(port = 6969): Promise<CreateTestServer> {
  return new Promise((resolve) => {
    app.listen(hostname, Number(port), (token) => {
      if (token) {
        resolve({
          app,
          token,
          httpConnection: `http://${hostname}:${port}`,
          wsConnection: `ws://${hostname}:${port}`,
        });
      }
    });
  });
}

export function stop(token: string) {
  us_listen_socket_close(token);
}

export function websocket(url: string, options = {} as any) {
  return new WebSocket(url, options);
}
