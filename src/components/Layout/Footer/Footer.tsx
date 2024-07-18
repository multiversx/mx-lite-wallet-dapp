import HeartIcon from 'assets/img/heart.svg?react';

import { version } from '../../../../package.json';
import { hash as walletVersion } from '../../../../version.json';

export const Footer = () => {
  return (
    <footer className='mx-auto w-full max-w-prose pb-6 pl-6 pr-6 text-center text-gray-400'>
      <div className='flex flex-col items-center text sm text-gray-400'>
        <a
          className='text-gray-400 text-sm hover:cursor-pointer hover:underline'
          href='/disclaimer'
        >
          Disclaimer
        </a>
        <a
          target='_blank'
          className='flex items-center text-sm hover:underline'
          href='https://multiversx.com/'
        >
          Made with <HeartIcon className='mx-1 fill-gray-400' /> by the
          MultiversX team
        </a>
        {walletVersion && (
          <span className='text-sm text-gray-400'>
            Build {version}-{walletVersion}
          </span>
        )}
      </div>
    </footer>
  );
};
