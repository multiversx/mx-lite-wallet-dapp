export function retry(fn: () => any, retries = 3, error = '') {
  if (!retries) {
    return Promise.reject(error);
  }

  return fn().catch((err: any) => {
    return setTimeout(() => {
      retry(fn, retries - 1, err);
    }, 100);
  });
}
