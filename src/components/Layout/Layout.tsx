import type { PropsWithChildren } from 'react';
import { AuthRedirectWrapper } from 'components/AuthRedirectWrapper';
import { Footer } from './Footer';
import { Header } from './Header';

export const Layout = ({ children }: PropsWithChildren) => {
  return (
    <div className='flex min-h-screen flex-col bg-slate-200'>
      <Header />
      <main className='flex flex-grow items-stretch justify-center py-6 px-3'>
        <AuthRedirectWrapper>{children}</AuthRedirectWrapper>
      </main>
      <Footer />
    </div>
  );
};
