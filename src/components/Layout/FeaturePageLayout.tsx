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
    className={`flex flex-col p-6 max-w-2xl w-full bg-white shadow-md rounded h-full mx-auto mt-12 ${className}`}
  >
    <h2 className='text-2xl font-bold p-2 mb-2 text-center'>{title}</h2>
    {children}
  </div>
);
