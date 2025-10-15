export const parseKeystoreJSON = (
  file: File | null
): Promise<Record<string, string> | null> => {
  return new Promise((resolve) => {
    if (!file) {
      return resolve(null);
    }

    const reader = new FileReader();

    reader.onload = (event) => {
      try {
        const result = event.target?.result;
        if (typeof result !== 'string') {
          return resolve(null);
        }

        const data = JSON.parse(result);

        resolve(data);
      } catch (error) {
        resolve(null);
      }
    };

    reader.onerror = () => {
      resolve(null);
    };

    reader.readAsText(file);
  });
};
