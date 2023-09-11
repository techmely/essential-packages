const lazyImportCache = new Map();

/**
 * You can use this like this const importUaParser = createCachedImport('ua-parser-js', () => import('ua-parser-js'))
 */
export function createCachedImport<T>(name: string, imp: () => Promise<T>): () => T | Promise<T> {
	return () => {
		const cached = lazyImportCache.get(name);
		if (cached) return cached;

		const promise = imp().then((module) => {
			lazyImportCache.set(name, module);
			return module;
		});
		lazyImportCache.set(name, promise);
		return promise;
	};
}

export const cacheStringFunction = <T extends (str: string) => string>(fn: T): T => {
	const cache: Record<string, string> = Object.create(null);
	return ((str: string) => {
		const hit = cache[str];
		// biome-ignore lint/suspicious/noAssignInExpressions: <explanation>
		return hit || (cache[str] = fn(str));
	}) as T;
};
