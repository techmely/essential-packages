export interface Cache<V = any> {
  value?: V;
  timeoutId?: ReturnType<typeof setTimeout>;
  time?: number;
  alive?: number;
}

type CacheInstance<T, V> = { [key in keyof T]?: Cache<V> };

const NOT_ALIVE = 0;

export class Memory<T = any, V = any> {
  #cache: CacheInstance<T, V> = {};

  #alive = 0;

  constructor(alive = NOT_ALIVE) {
    // Unit second
    this.#alive = alive * 1000;
  }

  get alive() {
    return this.#alive;
  }

  get cacheInstance() {
    return this.#cache;
  }

  set cacheInstance(cache: CacheInstance<T, V>) {
    this.#cache = cache;
  }

  get<K extends keyof T>(key: K) {
    return this.cacheInstance[key];
  }

  set<K extends keyof T>(key: K, value: V, expires?: number) {
    let item = this.get(key);
    let tempExpires = 0;

    tempExpires = !expires || (expires as number) <= 0 ? this.alive : expires;

    if (item) {
      if (item.timeoutId) {
        clearTimeout(item.timeoutId);
        item.timeoutId = undefined;
      }
      item.value = value;
    } else {
      item = { value, alive: tempExpires };
      this.cacheInstance[key] = item;
    }

    if (!tempExpires) {
      return value;
    }
    const now = Date.now();
    item.time = now + this.alive;
    item.timeoutId = setTimeout(
      () => {
        this.remove(key);
      },
      tempExpires > now ? tempExpires - now : tempExpires,
    );

    return value;
  }

  remove<K extends keyof T>(key: K) {
    const item = this.get(key);
    Reflect.deleteProperty(this.cacheInstance, key);
    if (item && item.timeoutId) {
      clearTimeout(item.timeoutId);
    }
  }

  resetCache(cache: { [K in keyof T]: Cache }) {
    Object.keys(cache).forEach(key => {
      const k = key as any as keyof T;
      const item = cache[k];
      if (item && item.time) {
        const now = Date.now();
        const expire = item.time;
        if (expire > now) {
          this.set(k, item.value, expire);
        }
      }
    });
  }
}
