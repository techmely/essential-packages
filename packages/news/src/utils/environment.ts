/*
 * accesses a variable inside of process.env, throwing an error if it's not found
 * always run this method in advance (i.e. upon initialization) so that the error is thrown as
 * early as possible
 * caching the values improves performance - accessing process.env many times is bad
 */
const cache: { [key: string]: any } = {};

function getEnvVarOrDie<T>(variableName: string, defaultValue?: T) {
  if (!(variableName in process.env)) {
    if (defaultValue) return defaultValue;
    throw new Error(`Cannot find ${variableName} in environment variables. Died.`);
  }

  if (cache[variableName]) return cache[variableName];

  cache[variableName] = process.env[variableName];

  return cache[variableName];
};

export const AppEnvConfig = {
  ENV: getEnvVarOrDie<string>('ENV', '') as 'development' | 'production' | 'staging',
  NODE_ENV: getEnvVarOrDie<string>('NODE_ENV', '') as 'development' | 'production',
  COOKIE_DOMAIN: getEnvVarOrDie<string>('COOKIE_DOMAIN', ''),

  NEWS_API_URL: getEnvVarOrDie<string>('NEWS_API_URL', '')
}
