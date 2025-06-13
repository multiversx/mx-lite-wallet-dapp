import { MxLink } from 'components';
import { DataTestIdsEnum } from 'localConstants';
import { AuthRedirectWrapper } from 'wrappers';
import { CreateRecoverRoutesEnum } from '../CreateRecover/routes';

export const Unlock = () => {
  return (
    <AuthRedirectWrapper requireAuth={false}>
      <div className='flex justify-center items-center'>
        <div
          className='flex flex-col p-6 items-center justify-center gap-4 rounded-xl bg-[#f6f8fa]'
          data-testid={DataTestIdsEnum.unlockPage}
        >
          <div className='flex flex-col items-center justify-center mt-1 gap-1'>
            <p className='text-center text-gray-400'>Don't have a wallet?</p>
            <div className='flex flex-col md:flex-row md:gap-4 items-center justify-center'>
              <MxLink
                className='text-blue-400 underline decoration-dotted hover:decoration-solid'
                data-testid={DataTestIdsEnum.createWalletBtn}
                to={CreateRecoverRoutesEnum.create}
              >
                Create
              </MxLink>
              <MxLink
                className='text-blue-400 underline decoration-dotted hover:decoration-solid'
                data-testid={DataTestIdsEnum.recoverWalletBtn}
                to={CreateRecoverRoutesEnum.recover}
              >
                Recover
              </MxLink>
            </div>
          </div>
        </div>
      </div>
    </AuthRedirectWrapper>
  );
};
