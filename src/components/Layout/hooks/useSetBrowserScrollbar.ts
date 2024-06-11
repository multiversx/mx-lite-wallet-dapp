import { useEffect } from 'react';
import UAParser from 'ua-parser-js';

export const useSetBrowserScrollbar = () => {
  const browser = UAParser();

  useEffect(() => {
    try {
      if (browser?.browser?.name) {
        document.body.classList.add(
          browser?.browser?.name?.replaceAll?.(' ', '-').toLowerCase() ?? ''
        );
      }

      if (browser?.engine?.name) {
        document.body.classList.add(
          browser?.engine?.name?.replaceAll?.(' ', '-').toLowerCase() ?? ''
        );
      }

      if (browser?.os?.name) {
        document.body.classList.add(
          browser?.os?.name?.replaceAll?.(' ', '-').toLowerCase() ?? ''
        );
      }
    } catch (err) {
      console.log('Unable to add class to body', err);
    }
  }, []);
};
