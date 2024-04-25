import { createEventContext } from "../context";
import type { ContextEventName, EventContextManager } from "../context/types";
import { Entity } from "../entity";
import type { CreateEntityProps } from "../entity/types";
import { UniqueEntityID } from "../entity/unique-entity";
import { DomainEvents } from "../events";
import type {
  AggregateEventHandler,
  DomainEventHandler,
  DomainEventOptions,
} from "../events/types";
import type {
  AggregateClearEventsConfig,
  AggregateConfig,
  AggregatePort,
  DomainEventMetrics,
} from "./types";

export abstract class Aggregate<Props> extends Entity<Props> implements AggregatePort<Props> {
  #domainEvents: DomainEvents<this>;
  #dispatchEventsCount: number;
  #aggregateConfig: AggregateConfig;
  #props: CreateEntityProps<Props>;

  constructor(
    props: CreateEntityProps<Props>,
    config: AggregateConfig,
    events?: DomainEvents<Aggregate<Props>>,
  ) {
    super(props, config);
    this.#props = props;
    this.#dispatchEventsCount = 0;
    this.#aggregateConfig = config;
    this.#domainEvents = new DomainEvents(this);
    if (events) this.#domainEvents = events as unknown as DomainEvents<this>;
  }

  /**
   * @description Get aggregate metrics
   * @access current events as number representing total of events in state for aggregate
   * @access total as number representing total events for aggregate including dispatched
   * @access dispatch total of events already dispatched
   */
  get eventMetrics(): DomainEventMetrics {
    return {
      current: this.#domainEvents.metrics.totalEvents(),
      total: this.#domainEvents.metrics.totalEvents() + this.#dispatchEventsCount,
      dispatch: this.#dispatchEventsCount,
    };
  }

  /**
   * @description Get hash to identify the aggregate.
   */
  override hashCode(): UniqueEntityID {
    const instance = Reflect.getPrototypeOf(this);
    return new UniqueEntityID(`[Aggregate@${instance?.constructor.name}]:${this.id}`);
  }

  override clone(props?: Partial<Props> & { copyEvents?: boolean }): this {
    const _props = props ? { ...this.#props, ...props } : this.#props;
    const events = props && !!props.copyEvents ? this.#domainEvents : null;
    const instance = Reflect.getPrototypeOf(this);
    if (!instance) throw new Error("Cannot get prototype of this entity instance");
    const aggregate = Reflect.construct(instance.constructor, [
      _props,
      this.#aggregateConfig,
      events,
    ]);
    return aggregate;
  }

  context(): EventContextManager {
    return createEventContext(this.#aggregateConfig.emitter);
  }

  dispatchEvent(name: ContextEventName, ...args: unknown[]): void {
    this.#domainEvents.dispatch(name, args);
    this.#dispatchEventsCount++;
  }

  async dispatchAll(): Promise<void> {
    const totalEvents = this.#domainEvents.metrics.totalEvents();
    await this.#domainEvents.dispatchEvents();
    this.#dispatchEventsCount += totalEvents;
  }

  clearEvents(config: AggregateClearEventsConfig = { resetMetrics: false }): void {
    if (config.resetMetrics) this.#dispatchEventsCount = 0;
    this.#domainEvents.clear();
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
  addEvent(
    nameOrEvent: unknown,
    handler?: DomainEventHandler<this>,
    options?: DomainEventOptions,
  ): void {
    if (typeof nameOrEvent === "string" && handler) {
      this.#domainEvents.add(nameOrEvent as ContextEventName, handler, options);
    }
    const _options = (nameOrEvent as AggregateEventHandler<this>)?.params?.options;
    const eventName = (nameOrEvent as AggregateEventHandler<this>)?.params?.name;
    const eventHandler = (nameOrEvent as AggregateEventHandler<this>)?.dispatch;
    this.#domainEvents.add(eventName, eventHandler, _options);
  }
  removeEvent(name: ContextEventName): number {
    const totalEvents = this.#domainEvents.metrics.totalEvents();
    this.#domainEvents.remove(name);
    return totalEvents - this.#domainEvents.metrics.totalEvents();
  }
}
