import { createPortal } from 'react-dom';
import { SidePanel } from 'components';
import { KeystorePanel } from 'components/KeystorePanel';

const panelStyles = {
  overlay: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100%'
  },
  panel: {
    backgroundColor: 'white',
    padding: '20px',
    borderRadius: '8px',
    width: '100%',
    maxWidth: '500px'
  }
};

export interface PanelWrapperProps {
  isOpen: boolean;
  onSubmit: (values: { privateKey: string; address: string }) => void;
  onClose: () => void;
  anchor?: HTMLElement;
}

export const PanelWrapper = ({
  isOpen,
  onSubmit,
  onClose,
  anchor
}: PanelWrapperProps) => {
  if (anchor) {
    return createPortal(
      <div style={panelStyles.overlay}>
        <div style={panelStyles.panel}>
          <KeystorePanel onSubmit={onSubmit} onClose={onClose} />
        </div>
      </div>,
      anchor
    );
  }

  return (
    <SidePanel
      isOpen={isOpen}
      panelTitle='Keystore Login'
      showHeader={true}
      onClose={onClose}
    >
      <div style={panelStyles.overlay}>
        <div style={panelStyles.panel}>
          <KeystorePanel onSubmit={onSubmit} onClose={onClose} />
        </div>
      </div>
    </SidePanel>
  );
};

export default PanelWrapper;
