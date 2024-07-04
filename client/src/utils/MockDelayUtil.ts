/**
 * Mock delay for testing
 * @param ms milliseconds
 * @returns Promise<void>
 */
export const sleep: (ms: number) => Promise<void> = (ms) => {
  return new Promise((resolve) => setTimeout(resolve, ms));
};
