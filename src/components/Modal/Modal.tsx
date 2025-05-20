import React, { PropsWithChildren, MouseEvent } from 'react';
import { faXmark } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import classNames from 'classnames';

interface ModalProps extends PropsWithChildren {
  isOpen: boolean;
  onClose: (event?: MouseEvent) => void;
  title?: string;
  className?: string;
  dataTestId?: string;
  hideCloseButton?: boolean;
}

export const Modal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  title,
  children,
  className,
  dataTestId,
  hideCloseButton = false
}) => {
  if (!isOpen) {
    return null;
  }

  const handleBackdropClick = (event: MouseEvent<HTMLDivElement>) => {
    if (event.target === event.currentTarget) {
      onClose(event);
    }
  };

  return (
    <div
      data-testid={dataTestId || 'modal-backdrop'}
      className='fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 transition-opacity duration-300 ease-in-out'
      onClick={handleBackdropClick}
      role='dialog'
      aria-modal='true'
      aria-labelledby={title ? 'modal-title' : undefined}
    >
      <div
        className={classNames(
          'bg-white rounded-lg shadow-xl transform transition-all sm:max-w-lg sm:w-full m-4 p-6 overflow-y-auto max-h-[90vh]',
          className
        )}
      >
        {!hideCloseButton && (
          <button
            onClick={onClose}
            className='absolute top-3 right-3 text-gray-400 hover:text-gray-600 focus:outline-none'
            aria-label='Close modal'
            data-testid='modal-close-button'
          >
            <FontAwesomeIcon icon={faXmark} />
          </button>
        )}
        {title && (
          <h3
            id='modal-title'
            className='text-lg font-medium leading-6 text-gray-900 mb-4'
            data-testid='modal-title'
          >
            {title}
          </h3>
        )}
        <div data-testid='modal-content'>{children}</div>
      </div>
    </div>
  );
};
