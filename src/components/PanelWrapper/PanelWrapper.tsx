import { PropsWithChildren } from 'react';
import { createPortal } from 'react-dom';
import { SidePanel } from 'components';

export interface PanelWrapperProps extends PropsWithChildren {
  isOpen: boolean;
  onClose: () => void;
  anchor?: HTMLElement;
  panelTitle: string;
  onBack?: () => void;
}

export const PanelWrapper = ({
  isOpen,
  onClose,
  anchor,
  panelTitle,
  children,
  onBack
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

  const handleBack = () => {
    console.log('handleBack');
    onBack?.();
  };

  const handleClose = () => {
    console.log('handleClose');
    onClose();
  };

  return (
    <SidePanel
      isOpen={isOpen}
      panelTitle={panelTitle}
      showHeader={true}
      onClose={handleClose}
      onBack={handleBack}
    >
      {panelContent}
    </SidePanel>
  );
};

export default PanelWrapper;
