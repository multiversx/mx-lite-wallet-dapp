import { AxiosResponse } from 'axios';

export const arraybufferToJSON = async <T extends AxiosResponse>(
  response: T
) => {
  const needsParsing = response.config.responseType === 'arraybuffer';

  if (!needsParsing) {
    return response.data;
  }

  const decoder = new TextDecoder('utf-8');
  const text = decoder.decode(new Uint8Array(response.data));

  try {
    const data = JSON.parse(text);
    return data;
  } catch (e) {
    // Handle JSON parse error if needed
    return Promise.reject(
      new Error('Failed to parse JSON from arraybuffer response.')
    );
  }
};
