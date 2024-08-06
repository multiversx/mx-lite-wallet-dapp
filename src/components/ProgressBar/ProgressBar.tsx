import { memo } from 'react';

export const ProgressBar = memo(({ progress }: { progress: number }) => (
  <div className='w-full bg-gray-200 rounded-full h-2.5'>
    <div
      className='bg-blue-600 h-2.5 rounded-full w-full'
      style={{
        width: `${progress}%`
      }}
    ></div>
  </div>
));
