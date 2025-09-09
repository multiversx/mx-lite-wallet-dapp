import { PropsWithChildren, ReactNode } from 'react';

interface FeaturePageLayoutProps extends PropsWithChildren {
  title: ReactNode;
  className?: string;
}

export const FeaturePageLayout = ({
  title,
  children,
  className = ''
}: FeaturePageLayoutProps) => (
  <div
    className={`flex flex-col p-6 lg:p-10 justify-center border border-secondary max-w-2xl w-full rounded-xl bg-primary transition-all duration-200 ease-out h-full mx-auto mt-12 ${className}`}
  >
    <h2 className='text-2xl text-primary font-medium p-2 mb-2 text-center'>
      {title}
    </h2>
    {children}
  </div>
);
