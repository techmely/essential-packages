import type { Entity } from "../domain";

export interface DomainMapper<
  Props,
  DbRecord,
  DomainEntity extends Entity<Props>,
  Response = unknown,
> {
  toPersistence(entity: DomainEntity): DbRecord;
  toDomain(record: DbRecord): DomainEntity;
  toResponse(entity: DomainEntity): Response;
}
