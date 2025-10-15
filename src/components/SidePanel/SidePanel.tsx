import { ReactNode } from 'react';
import { MvxSidePanel } from '@multiversx/sdk-dapp-ui/react';
export interface ISidePanelProps {
  isOpen?: boolean;
  panelTitle?: string;
  panelClassName?: string;
  hasBackButton?: boolean;
  showHeader?: boolean;
  children?: ReactNode;
  onClose?: () => void;
}

export const SidePanel = ({
  isOpen = false,
  panelTitle = 'Panel',
  panelClassName,
  hasBackButton = false,
  showHeader = true,
  children,
  onClose
}: ISidePanelProps) => (
  <MvxSidePanel
    isOpen={isOpen}
    panelTitle={panelTitle}
    panelClassName={panelClassName}
    hasBackButton={hasBackButton}
    showHeader={showHeader}
    onClose={onClose}
  >
    {children}
  </MvxSidePanel>
);
