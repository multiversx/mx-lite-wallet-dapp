import React, { PropsWithChildren } from 'react';
import { Header, Footer } from '../components';

export const NavbarLayout = ({ children }: PropsWithChildren) => {
  return (
    <div className='flex min-h-screen flex-col bg-slate-200'>
      <Header />
      <main className='flex flex-grow items-stretch justify-center p-6'>
        {children}
      </main>
      <Footer />
    </div>
  );
};
