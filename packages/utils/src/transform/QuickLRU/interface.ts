// prettier-ignore
export abstract class QuickLruAbstract<KeyType, ValueType> implements Iterable<[KeyType, ValueType]> {

  abstract [Symbol.iterator](): IterableIterator<[KeyType, ValueType]>;

  /**
	Set an item. Returns the instance.
   
	Individual expiration of an item can be specified with the `maxAge` option. If not specified, the global `maxAge` value will be used in case it is specified in the constructor, otherwise the item will never expire.
   
	@returns The list instance.
   */
  abstract set(key: KeyType, value: ValueType, options?: { maxAge?: number }): this;

  /**
	Get an item.
   
	@returns The stored item or `undefined`.
   */
  abstract get(key: KeyType): ValueType | undefined;

  /**
	Check if an item exists.
   */
  abstract has(key: KeyType): boolean;

  /**
	Get an item without marking it as recently used.
   
	@returns The stored item or `undefined`.
   */
  abstract peek(key: KeyType): ValueType | undefined;

  /**
	Delete an item.
   
	@returns `true` if the item is removed or `false` if the item doesn't exist.
   */
  abstract delete(key: KeyType): boolean;

  /**
	Delete all items.
   */
  abstract clear(): void;

  /**
	Update the `maxSize` in-place, discarding items as necessary. Insertion order is mostly preserved, though this is not a strong guarantee.
   
	Useful for on-the-fly tuning of cache sizes in live systems.
   */
  abstract resize(maxSize: number): void;

  /**
	Iterable for all the keys.
   */
  abstract  keys(): IterableIterator<KeyType>;

  /**
	Iterable for all the values.
   */
  abstract values(): IterableIterator<ValueType>;

  /**
	Iterable for all entries, starting with the oldest (ascending in recency).
   */
  abstract entriesAscending(): IterableIterator<[KeyType, ValueType]>;

  abstract entriesDescending(): IterableIterator<[KeyType, ValueType]>;
}

export interface Options<KeyType, ValueType> {
  /**
	The maximum number of milliseconds an item should remain in the cache.
   
	@default Infinity
   
	By default, `maxAge` will be `Infinity`, which means that items will never expire.
	Lazy expiration upon the next write or read call.
   
	Individual expiration of an item can be specified by the `set(key, value, maxAge)` method.
   */
  readonly maxAge?: number;

  /**
	The maximum number of items before evicting the least recently used items.
   */
  readonly maxSize: number;

  /**
	Called right before an item is evicted from the cache.
   
	Useful for side effects or for items like object URLs that need explicit cleanup (`revokeObjectURL`).
   */
  onEviction?: (key: KeyType, value: ValueType) => void;
}
