import { useScrollToElement } from 'hooks';
import { WidgetType } from 'types/widget.types';
import { AuthRedirectWrapper } from 'wrappers';
import { Widget } from './components';
import { Account, NFTs, Tokens, Transactions } from './widgets';

const WIDGETS: WidgetType[] = [
  {
    title: 'Tokens',
    widget: Tokens,
    description: 'Tokens for the connected account',
    reference:
      'https://api.multiversx.com/#/accounts/AccountController_getAccountTokens'
  },
  {
    title: 'NFTs',
    widget: NFTs,
    description: 'NFTs for the connected account',
    reference:
      'https://api.multiversx.com/#/accounts/AccountController_getAccountNfts'
  },
  {
    title: 'Transactions',
    widget: Transactions,
    description: 'Transactions list for the connected account',
    reference:
      'https://api.multiversx.com/#/accounts/AccountController_getAccountTransactions'
  }
];

export const Dashboard = () => {
  useScrollToElement();

  return (
    <AuthRedirectWrapper>
      <div className='flex flex-col gap-6 max-w-2xl w-full'>
        <Account />
        {WIDGETS.map((element) => (
          <Widget key={element.title} {...element} />
        ))}
      </div>
    </AuthRedirectWrapper>
  );
};
