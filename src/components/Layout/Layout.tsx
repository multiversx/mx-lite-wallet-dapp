import type { PropsWithChildren } from 'react';
import { AuthRedirectWrapper } from 'wrappers/AuthRedirectWrapper';
import { Footer } from './Footer';
import { Header } from './Header';

// prettier-ignore
const styles = {
  layoutContainer: 'layout-container flex min-h-screen flex-col bg-accent transition-all duration-200 ease-out',
  mainContainer: 'main-container flex flex-grow items-stretch justify-center px-2'
} satisfies Record<string, string>;

export const Layout = ({ children }: PropsWithChildren) => {
  return (
    <div className={styles.layoutContainer}>
      <Header />

      <main className={styles.mainContainer}>
        <AuthRedirectWrapper>{children}</AuthRedirectWrapper>
      </main>

      <Footer />
    </div>
  );
};
