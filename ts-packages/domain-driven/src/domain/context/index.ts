import type EventEmitter from "node:events";
import { isBrowser } from "@techmely/utils";
import { BrowserEventManager } from "./browser.event";
import { ServerEventManager } from "./server.event";
import type { EventContextManager } from "./types";

let eventContextManager: EventContextManager;

export function createEventContext(emitter: EventEmitter): EventContextManager {
  if (eventContextManager) return eventContextManager;
  if (isBrowser()) {
    eventContextManager = BrowserEventManager.instance(globalThis.window);
  } else {
    eventContextManager = ServerEventManager.instance(emitter);
  }
  return eventContextManager;
}
