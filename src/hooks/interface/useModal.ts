import { useState, MouseEvent } from 'react';

export interface UseModalReturnType {
  show: boolean;
  handleShow?: (event?: MouseEvent) => void; // not needed for route modals
  handleClose: (event?: MouseEvent) => void;
}

export const useModal = (): UseModalReturnType & {
  handleShow: (event?: MouseEvent) => void;
} => {
  const [show, setShow] = useState(false);

  const handleClose = (event?: MouseEvent) => {
    event?.preventDefault?.();

    if (!show) {
      return;
    }

    setShow(false);
  };

  const handleShow = (event?: MouseEvent) => {
    event?.preventDefault?.();

    if (!show) {
      setShow(true);
    }
  };

  return { show, handleShow, handleClose };
};
