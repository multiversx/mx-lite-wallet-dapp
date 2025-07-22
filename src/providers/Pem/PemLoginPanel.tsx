import { createRoot, Root } from 'react-dom/client';
import PanelWrapper from 'components/PanelWrapper/PanelWrapper';
import { PemPanel } from 'components/PemPanel';

interface IPemLoginPanelState {
  root: Root;
  isOpen: boolean;
  resolveFn: ((resolvedValue: IPemPanelReturn) => void) | null;
  anchor: HTMLElement | undefined;
}

interface IPemPanelReturn {
  privateKey: string;
  address: string;
}

export class PemLoginPanel {
  private static instance: PemLoginPanel;
  private _panelRoot: HTMLDivElement;
  private _currentPanel: IPemLoginPanelState | null = null;

  private constructor() {
    this._panelRoot = document.createElement('div');
    document.body.appendChild(this._panelRoot);
    this._initializePanel();
  }

  public static getInstance(): PemLoginPanel {
    if (!PemLoginPanel.instance) {
      PemLoginPanel.instance = new PemLoginPanel();
    }
    return PemLoginPanel.instance;
  }

  private _initializePanel() {
    const root = createRoot(this._panelRoot);
    this._currentPanel = {
      root,
      isOpen: false,
      resolveFn: null,
      anchor: undefined
    };

    this._renderPanel();
  }

  private _renderPanel() {
    if (!this._currentPanel) {
      return;
    }

    const onSubmit = (values: { privateKey: string; address: string }) => {
      if (!this._currentPanel) {
        return;
      }

      this._currentPanel.isOpen = false;
      this._currentPanel.resolveFn?.(values);
      this._renderPanel();
    };

    const onClose = () => {
      if (!this._currentPanel) {
        return;
      }

      this._currentPanel.isOpen = false;
      this._currentPanel.resolveFn?.({ privateKey: '', address: '' });
      this._renderPanel();
    };

    this._currentPanel.root.render(
      <PanelWrapper
        isOpen={this._currentPanel.isOpen}
        onClose={onClose}
        anchor={this._currentPanel.anchor}
        panelTitle='PEM Login'
      >
        <PemPanel onSubmit={onSubmit} onClose={onClose} />
      </PanelWrapper>
    );
  }

  public showPanel(options?: {
    needsAddress: boolean;
    anchor?: HTMLElement;
  }): Promise<IPemPanelReturn> {
    return new Promise((resolve) => {
      if (!this._currentPanel) {
        return Promise.reject(new Error('Panel not initialized'));
      }

      this._currentPanel.resolveFn = resolve;
      this._currentPanel.isOpen = true;
      this._currentPanel.anchor = options?.anchor;
      this._renderPanel();
    });
  }
}
