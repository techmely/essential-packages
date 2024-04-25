import { createEventContext } from "../context";
import type { EventContextManager } from "../context/types";
import { Entity } from "../entity";
import type { CreateEntityProps } from "../entity/types";
import { DomainEvents } from "../events";
import type {
  AggregateEventHandler,
  DomainEventHandler,
  DomainEventOptions,
} from "../events/types";
import type { AggregateConfig, AggregatePort } from "./types";

export abstract class Aggregate<Props> extends Entity<Props> implements AggregatePort<Props> {
  #domainEvents: DomainEvents<this>;
  #dispatchEventsCount: number;
  #aggregateConfig: AggregateConfig;

  constructor(
    props: CreateEntityProps<Props>,
    config: AggregateConfig,
    events?: DomainEvents<Aggregate<Props>>,
  ) {
    super(props, config);
    this.#dispatchEventsCount = 0;
    this.#aggregateConfig = config;
    this.#domainEvents = new DomainEvents(this);
    if (events) this.#domainEvents = events as unknown as DomainEvents<this>;
  }
  context(): EventContextManager {
    return createEventContext(this.#aggregateConfig.emitter);
  }
  dispatchEvent(name: string, ...args: unknown[]): void {
    throw new Error("Method not implemented.");
  }
  dispatchAll(): Promise<void> {
    throw new Error("Method not implemented.");
  }
  clearEvents(): void {
    throw new Error("Method not implemented.");
  }
  addEvent(event: DomainEventHandler<this>): void;
  addEvent(
    name: string,
    handler: DomainEventHandler<this>,
    options?: DomainEventOptions | undefined,
  ): void;
  addEvent(
    nameOrEvent: string | AggregateEventHandler<this>,
    handler: DomainEventHandler<this>,
    options?: DomainEventOptions | undefined,
  ): void;
  addEvent(nameOrEvent: unknown, handler?: unknown, options?: unknown): void {
    throw new Error("Method not implemented.");
  }
  removeEvent(name: string): number {
    throw new Error("Method not implemented.");
  }
}
