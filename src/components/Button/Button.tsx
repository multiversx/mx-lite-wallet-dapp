import type { PropsWithChildren, MouseEvent } from 'react';
import { WithClassnameType } from 'types';

interface ButtonType extends WithClassnameType, PropsWithChildren {
  onClick?: (e: MouseEvent) => void;
  disabled?: boolean;
  dataTestId?: string;
  dataCy?: string;
  id?: string;
  type?: 'button' | 'submit' | 'reset';
}

export const Button = ({
  children,
  onClick,
  disabled = false,
  type = 'button',
  id,
  className = 'inline-block rounded-xl px-6 h-12 text-center hover:no-underline my-0 bg-btn-primary text-btn-primary cursor-pointer hover:opacity-75 mr-0 disabled:bg-none disabled:text-neutral-500 disabled:cursor-not-allowed',
  dataTestId,
  ...otherProps
}: ButtonType) => {
  return (
    <button
      className={className}
      data-testid={dataTestId}
      disabled={disabled}
      id={id}
      onClick={onClick}
      type={type}
      {...otherProps}
    >
      {children}
    </button>
  );
};
