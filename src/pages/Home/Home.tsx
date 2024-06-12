import { AuthRedirectWrapper, PageWrapper } from 'wrappers';

export const Home = () => {
  return (
    <AuthRedirectWrapper requireAuth={false}>
      <PageWrapper>
        <div className='flex flex-col-reverse sm:flex-row items-center h-full w-full'>
          <div className='flex items-start sm:items-center h-full sm:w-1/2 sm:bg-center'>
            <div className='flex flex-col gap-2 max-w-[70sch] text-center sm:text-left text-xl font-medium md:text-2xl lg:text-3xl'>
              <div>
                <h1>Lite Wallet dApp</h1>
                <p className='text-gray-400'>
                  The starter project for any wallet dApp{' '}
                  <br className='hidden xl:block' />
                  built on the{' '}
                  <a
                    href='https://multiversx.com/'
                    target='_blank'
                    className='text-gray-400 underline decoration-dotted hover:decoration-solid'
                  >
                    MultiversX
                  </a>{' '}
                  blockchain.
                </p>
              </div>
            </div>
          </div>
          <div className='h-4/6 bg-mvx-white bg-contain bg-no-repeat w-1/2 bg-center' />
        </div>
      </PageWrapper>
    </AuthRedirectWrapper>
  );
};
