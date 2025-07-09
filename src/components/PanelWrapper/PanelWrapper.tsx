import { PropsWithChildren } from 'react';
import { createPortal } from 'react-dom';
import { SidePanel } from 'components';

export interface PanelWrapperProps extends PropsWithChildren {
  isOpen: boolean;
  onClose: () => void;
  anchor?: HTMLElement;
  panelTitle: string;
}

export const PanelWrapper = ({
  isOpen,
  onClose,
  anchor,
  panelTitle,
  children
}: PanelWrapperProps) => {
  const panelContent = (
    <div
      style={{
        width: '100%',
        maxWidth: 400,
        margin: '0 auto',
        padding: '24px 0',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'stretch'
      }}
    >
      {children}
    </div>
  );

  if (anchor) {
    return createPortal(panelContent, anchor);
  }

  return (
    <SidePanel
      isOpen={isOpen}
      panelTitle={panelTitle}
      showHeader={true}
      onClose={onClose}
    >
      {panelContent}
    </SidePanel>
  );
};

export default PanelWrapper;
