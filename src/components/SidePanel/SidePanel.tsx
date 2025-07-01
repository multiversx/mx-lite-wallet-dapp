import { ReactNode, useCallback } from 'react';
import { MvxSidePanel } from '@multiversx/sdk-dapp-ui/react';

// Define the component props based on the MvxSidePanel interface
export interface SidePanelProps {
  isOpen?: boolean;
  panelTitle?: string;
  panelClassName?: string;
  hasBackButton?: boolean;
  showHeader?: boolean;
  children?: ReactNode;
  onClose?: () => void;
  onBack?: () => void;
}

export const SidePanel = ({
  isOpen = false,
  panelTitle = 'Panel',
  panelClassName,
  hasBackButton = false,
  showHeader = true,
  children,
  onClose,
  onBack
}: SidePanelProps) => {
  const handleClose = useCallback(() => {
    onClose?.();
  }, [onClose]);

  const handleBack = useCallback(() => {
    onBack?.();
  }, [onBack]);

  return (
    <MvxSidePanel
      isOpen={isOpen}
      panelTitle={panelTitle}
      panelClassName={panelClassName}
      hasBackButton={hasBackButton}
      showHeader={showHeader}
      onClose={handleClose}
      onBack={handleBack}
    >
      {children}
    </MvxSidePanel>
  );
};
