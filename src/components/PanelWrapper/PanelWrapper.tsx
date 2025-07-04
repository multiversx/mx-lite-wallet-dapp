import { createPortal } from 'react-dom';
import { SidePanel } from 'components';
import React from 'react';

export interface PanelWrapperProps {
  isOpen: boolean;
  onSubmit: (values: { privateKey: string; address: string }) => void;
  onClose: () => void;
  anchor?: HTMLElement;
  panelTitle: string;
  PanelComponent: React.ComponentType<{
    onSubmit: (values: { privateKey: string; address: string }) => void;
    onClose: () => void;
  }>;
}

export const PanelWrapper = ({
  isOpen,
  onSubmit,
  onClose,
  anchor,
  panelTitle,
  PanelComponent
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
      <PanelComponent onSubmit={onSubmit} onClose={onClose} />
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
