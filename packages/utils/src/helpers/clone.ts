export const deepClone = <P extends any>(obj: P): P => {
  if (obj instanceof Date) {
    return new Date(obj.valueOf()) as P;
  }

  return JSON.parse(JSON.stringify(obj));
};
