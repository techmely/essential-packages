export * from './invariant';

export function warn(message: string, ...args: any[]) {
  console.warn(`\u001B[1m\u001B[33m[Techmely]\u001B[0m\u001B[33m ${message}\u001B[0m\n`, args);
}
