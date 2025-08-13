import { useCallback } from 'react';
import { getAccountProvider, Message } from 'lib';

export const useSignMessage = () => {
  const provider = getAccountProvider();

  return useCallback(
    async (messageToSign: Message): Promise<Message> => {
      if (!provider) {
        throw new Error('No provider available for signing message');
      }

      // Check if the provider has a signMessage method
      if (typeof provider.signMessage === 'function') {
        const signedMessage = await provider.signMessage(messageToSign);

        if (!signedMessage) {
          throw new Error('Failed to sign message - no signature returned');
        }

        return signedMessage;
      }

      throw new Error('Provider does not support message signing');
    },
    [provider]
  );
};
