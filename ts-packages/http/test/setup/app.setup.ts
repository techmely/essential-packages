import uWS from "uWebSockets.js";

const app = uWS.App();

app.ws("/*", {
  compression: uWS.SHARED_COMPRESSOR,
  maxPayloadLength: 16 * 1024 * 1024,
  idleTimeout: 300,
});

export default app;
