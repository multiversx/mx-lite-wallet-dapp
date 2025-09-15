import { MouseEvent, PropsWithChildren, ReactNode } from 'react';
import classNames from 'classnames';
import { Sheet } from 'react-modal-sheet';

import { WithClassnameType } from 'types';
import { styles } from './drawer.styles';

interface DrawerPropsType extends PropsWithChildren, WithClassnameType {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  title: ReactNode;
}

export const Drawer = ({
  isOpen,
  setIsOpen,
  children,
  title,
  className
}: DrawerPropsType) => {
  const handleDismiss = (event: MouseEvent<HTMLDivElement>) => {
    event.preventDefault();
    setIsOpen(false);
  };

  return (
    <Sheet
      isOpen={isOpen}
      onClose={() => setIsOpen(false)}
      detent='content-height'
      className={classNames(styles.drawer, className)}
    >
      <Sheet.Container className={styles.drawerContainer}>
        <Sheet.Content>
          <div className={styles.drawerContent}>
            <div className={styles.drawerContentHeader}>
              <div className={styles.drawerContentHeaderTitle}>{title}</div>

              <div
                onClick={handleDismiss}
                className={styles.drawerContentHeaderClose}
              />
            </div>

            <div>{children}</div>
          </div>
        </Sheet.Content>
      </Sheet.Container>
    </Sheet>
  );
};
