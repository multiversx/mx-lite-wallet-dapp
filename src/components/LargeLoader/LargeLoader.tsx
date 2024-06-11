import { Loader } from '../PageStates';

export const LargeLoader = () => (
  <div className='large-loader-wrapper' data-testid='largeLoader'>
    <Loader hideText iconClass='large-loader-icon' className='large-loader' />
  </div>
);
