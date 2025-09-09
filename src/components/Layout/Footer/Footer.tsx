import { useState, useEffect } from 'react';
import HeartIcon from 'assets/img/heart.svg?react';

import { version } from '../../../../package.json';

export const Footer = () => {
  const [walletVersion, setWalletVersion] = useState<string | null>(null);

  useEffect(() => {
    const loadVersion = async () => {
      try {
        const versionModule = await import('../../../../version.json');
        setWalletVersion(versionModule.hash);
      } catch (error) {
        console.error('Failed to load version information', error);
        setWalletVersion(null);
      }
    };

    loadVersion();
  }, []);

  return (
    <footer className='mx-auto w-full max-w-prose p-6 text-center text-neutral-500'>
      <div className='flex flex-col items-center text sm text-neutral-500'>
        <a
          className='text-neutral-500 text-sm hover:cursor-pointer hover:underline'
          href='/disclaimer'
        >
          Disclaimer
        </a>

        <a
          target='_blank'
          className=' flex items-center justify-center gap-1 text-sm text-neutral-500 hover:underline'
          href='https://multiversx.com/'
        >
          Made with <HeartIcon className='mx-1 fill-neutral-500' /> by the
          MultiversX team
        </a>

        {walletVersion && (
          <span className='text-sm text-neutral-500'>
            Build {version}-{walletVersion}
          </span>
        )}
      </div>
    </footer>
  );
};
