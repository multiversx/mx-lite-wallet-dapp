import React from 'react';

import { ActiveTransactionTracker } from './components/ActiveTransactionTracker';
import { IdleTimer } from './components/IdleTimer';
import { PostMessageListener } from './components/PostMessageListener';
import { RedirectWebviewLogin } from './components/RedirectWebviewLogin';
import { UnauthenticatedLoginGuard } from './components/UnauthenticatedLoginGuard';

export const WalletUtilities = () => (
  <section>
    <IdleTimer />
    <ActiveTransactionTracker />
    <UnauthenticatedLoginGuard />
    <RedirectWebviewLogin />
    <PostMessageListener />
  </section>
);
