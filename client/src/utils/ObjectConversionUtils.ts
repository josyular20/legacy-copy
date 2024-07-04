export const convertNumericToString = <T>(inputObject: T): T => {
  const newObj = { ...inputObject };

  for (const key in newObj) {
    if (typeof newObj[key] === 'number') {
      newObj[key] = String(newObj[key]) as T[Extract<keyof T, string>];
    }
  }

  return newObj;
};
