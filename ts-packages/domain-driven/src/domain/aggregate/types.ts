import type EventEmitter from "node:events";
import type { EventContextManager } from "../context/types";
import type { EntityConfig } from "../entity/types";
import type { UniqueEntityID } from "../entity/unique-entity";
import type {
  AggregateEventHandler,
  DomainEventHandler,
  DomainEventOptions,
} from "../events/types";

export type AggregateConfig = {
  emitter: EventEmitter;
} & EntityConfig;

export interface AggregatePort<T> {
  hashCode(): UniqueEntityID;
  context(): EventContextManager;
  clone(props?: unknown): AggregatePort<T>;
  dispatchEvent(name: string, ...args: unknown[]): void;
  dispatchAll(): Promise<void>;
  clearEvents(): void;
  addEvent(event: DomainEventHandler<this>): void;
  addEvent(name: string, handler: DomainEventHandler<this>, options?: DomainEventOptions): void;
  addEvent(
    nameOrEvent: string | AggregateEventHandler<this>,
    handler: DomainEventHandler<this>,
    options?: DomainEventOptions,
  ): void;
  removeEvent(name: string): number;
}
