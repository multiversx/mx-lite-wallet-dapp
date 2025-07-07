import { createRoot, Root } from 'react-dom/client';
import { KeystorePanel } from 'components/KeystorePanel';
import { PanelWrapper } from 'components/PanelWrapper';

interface KeystoreLoginPanelState {
  root: Root;
  isOpen: boolean;
  resolve:
    | ((value: {
        privateKey: string;
        address: string;
        keystoreFile?: string;
        keystoreFileName?: string;
        addressIndex?: number;
      }) => void)
    | null;
  anchor: HTMLElement | undefined;
}

export class KeystoreLoginPanel {
  private static instance: KeystoreLoginPanel;
  private _panelRoot: HTMLDivElement;
  private _currentPanel: KeystoreLoginPanelState | null = null;

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
      resolve: null,
      anchor: undefined
    };

    this._renderPanel();
  }

  private _renderPanel(options?: {
    needsAddress?: boolean;
    anchor?: HTMLElement;
    savedKeystoreFile?: string;
    keystoreFileName?: string;
  }) {
    if (!this._currentPanel) {
      return;
    }

    const onSubmit = (values: {
      privateKey: string;
      address: string;
      keystoreFile?: string;
      keystoreFileName?: string;
      addressIndex?: number;
    }) => {
      if (!this._currentPanel) {
        return;
      }

      this._currentPanel.isOpen = false;
      this._currentPanel.resolve?.(values);
      this._renderPanel();
    };

    const onClose = () => {
      if (!this._currentPanel) {
        return;
      }

      this._currentPanel.isOpen = false;
      this._currentPanel.resolve?.({ privateKey: '', address: '' });
      this._renderPanel();
    };

    this._currentPanel.root.render(
      <PanelWrapper
        isOpen={this._currentPanel.isOpen}
        onClose={onClose}
        anchor={this._currentPanel.anchor}
        panelTitle='Keystore Login'
      >
        <KeystorePanel
          onSubmit={onSubmit}
          onClose={onClose}
          needsAddress={options?.needsAddress}
          savedKeystoreFile={options?.savedKeystoreFile}
          keystoreFileName={options?.keystoreFileName}
        />
      </PanelWrapper>
    );
  }

  public showPanel(options?: {
    needsAddress?: boolean;
    anchor?: HTMLElement;
    savedKeystoreFile?: string;
    keystoreFileName?: string;
  }): Promise<{
    privateKey: string;
    address: string;
    keystoreFile?: string;
    keystoreFileName?: string;
    addressIndex?: number;
  }> {
    return new Promise((resolve) => {
      if (!this._currentPanel) {
        return Promise.reject(new Error('Panel not initialized'));
      }

      this._currentPanel.resolve = resolve;
      this._currentPanel.isOpen = true;
      this._currentPanel.anchor = options?.anchor;
      this._renderPanel(options);
    });
  }
}
