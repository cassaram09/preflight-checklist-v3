export const sleep = (delayMs: number): Promise<void> => {
  return new Promise((resolve) => setTimeout(resolve, delayMs));
};

export const debounce = (delayMs: number, cb: (e: unknown) => void) => {
  let time = Date.now();

  return function debounced(e: unknown) {
    if (time + delayMs - Date.now() < 0) {
      cb(e);
      time = Date.now();
    }
  };
};

export const range = (count: number | string, start = 0): number[] =>
  [...Array(count).keys()].map((i) => i + start);
