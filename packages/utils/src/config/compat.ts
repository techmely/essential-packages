import { warn } from '../logger';

type DeprecationData = {
  message: string | ((...args: any[]) => string);
  link?: string;
};

export const enum DeprecationTypes {
  CONFIG_SILENT = 'CONFIG_SILENT',
}

export const deprecationData: Record<DeprecationTypes, DeprecationData> = {
  [DeprecationTypes.CONFIG_SILENT]: {
    message:
      'config.silent has been removed because it is not good practice to ' +
      "intentionally suppress warnings. You can use your browser console's " +
      'filter features to focus on relevant messages.',
  },
};

export const warnDeprecation = (key: DeprecationTypes, ...args: any[]) => {
  if (!__DEV__ || __TEST__) return;

  const { message, link } = deprecationData[key];
  warn(
    `(deprecation ${key}) ${typeof message === 'function' ? message(...args) : message}${
      link ? `\n  Details: ${link}` : ''
    }`,
  );
};
