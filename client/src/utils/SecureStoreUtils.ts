import { deleteItemAsync, getItemAsync, setItemAsync } from 'expo-secure-store';

const CHUNK_SIZE = 1000;

/**
 * Function to store data in SecureStore
 * @param key - The key to store the data under
 * @param data - The data to store
 * @returns - A promise that resolves when the data is stored
 * @throws - An error if the data is too large to store
 * @example
 * const data = { name: 'John Doe', age: 30 };
 * await setItem('user', data);
 **/
export const setItem = async <T>(key: string, data: T): Promise<void> => {
  const serializedData = JSON.stringify(data);
  const chunks = [];

  // Chunk the serialized data
  for (let i = 0; i < serializedData.length; i += CHUNK_SIZE) {
    chunks.push(serializedData.slice(i, i + CHUNK_SIZE));
  }

  // Store each chunk in SecureStore with a unique key identifier
  for (let j = 0; j < chunks.length; j++) {
    await setItemAsync(`${key}_${j}`, chunks[j]);
  }
};

/**
 * Function to retrieve data from SecureStore
 * @param key - The key to retrieve the data from
 * @returns - A promise that resolves with the data
 * @example
 * const data = await getItem('user');
 * console.log(data); // { name: 'John Doe', age: 30 }
 */
export const getItem = async <T>(key: string): Promise<T | null> => {
  let index = 0;
  let chunks = [];
  let chunk;

  // Retrieve chunks from SecureStore using the specified key
  do {
    chunk = await getItemAsync(`${key}_${index}`);
    if (chunk) {
      chunks.push(chunk);
      index++;
    }
  } while (chunk);

  if (chunks.length === 0) {
    return null; // No data found for the specified key
  }

  // Reconstruct the serialized data from chunks
  const serializedData = chunks.join('');
  return JSON.parse(serializedData) as T;
};

export const deleteItem = async (key: string): Promise<void> => {
  let index = 0;
  let chunk;

  // Delete chunks from SecureStore using the specified key
  do {
    chunk = await getItemAsync(`${key}_${index}`);
    if (chunk) {
      await deleteItemAsync(`${key}_${index}`);
      index++;
    }
  } while (chunk);
};
