import debug from 'debug';

interface DebuggerOptions {
  onlyWhenFocused?: boolean | string;
}
export type TechmelyDebugScope = `techmely:${string}`;

export function createDebugger(
  namespace: TechmelyDebugScope,
  options: DebuggerOptions = {}
): debug.Debugger['log'] {
  const log = debug(namespace);
  const { onlyWhenFocused } = options;
  const focus =
    typeof onlyWhenFocused === 'string' ? onlyWhenFocused : namespace;
  return (msg: string, ...args: any[]) => {
    if (onlyWhenFocused) {
      return;
    }
    log(msg, ...args);
  };
}
