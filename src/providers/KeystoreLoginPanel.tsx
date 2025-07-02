import React from 'react';
import { createPortal } from 'react-dom';
import { createRoot } from 'react-dom/client';
import { SidePanel, KeystorePanel } from 'components';

const modalStyles = {
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

interface PanelWrapperProps {
  isOpen: boolean;
  onSubmit: (values: { privateKey: string; address: string }) => void;
  onClose: () => void;
  anchor?: HTMLElement;
}

const PanelWrapper = ({
  isOpen,
  onSubmit,
  onClose,
  anchor
}: PanelWrapperProps) => {
  if (anchor) {
    return createPortal(
      <div style={modalStyles.overlay}>
        <div style={modalStyles.panel}>
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
      <div style={modalStyles.overlay}>
        <div style={modalStyles.panel}>
          <KeystorePanel onSubmit={onSubmit} onClose={onClose} />
        </div>
      </div>
    </SidePanel>
  );
};

export class KeystoreLoginPanel {
  private static instance: KeystoreLoginPanel;
  private _panelRoot: HTMLDivElement;
  private _currentPanel: any = null;

  private constructor() {
    this._panelRoot = document.createElement('div');
    document.body.appendChild(this._panelRoot);
    this._initializePanel();
  }

  public static getInstance(): KeystoreLoginPanel {
    if (!KeystoreLoginPanel.instance) {
      KeystoreLoginPanel.instance = new KeystoreLoginPanel();
    }
    return KeystoreLoginPanel.instance;
  }

  private _initializePanel() {
    const root = createRoot(this._panelRoot);
    this._currentPanel = {
      root,
      isOpen: false,
      resolve: null as
        | ((value: { privateKey: string; address: string }) => void)
        | null,
      anchor: undefined as HTMLElement | undefined
    };

    this._renderPanel();
  }

  private _renderPanel() {
    this._currentPanel.root.render(
      <PanelWrapper
        isOpen={this._currentPanel.isOpen}
        onSubmit={(values) => {
          this._currentPanel.isOpen = false;
          if (this._currentPanel.resolve) {
            this._currentPanel.resolve(values);
          }
          this._renderPanel();
        }}
        onClose={() => {
          this._currentPanel.isOpen = false;
          if (this._currentPanel.resolve) {
            this._currentPanel.resolve({ privateKey: '', address: '' });
          }
          this._renderPanel();
        }}
        anchor={this._currentPanel.anchor}
      />
    );
  }

  public showPanel(options?: {
    needsAddress: boolean;
    anchor?: HTMLElement;
  }): Promise<{
    privateKey: string;
    address: string;
  }> {
    return new Promise((resolve) => {
      this._currentPanel.resolve = resolve;
      this._currentPanel.isOpen = true;
      this._currentPanel.anchor = options?.anchor;
      this._renderPanel();
    });
  }
}
