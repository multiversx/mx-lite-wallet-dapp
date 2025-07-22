import { ReactElement } from 'react';
import { createRoot, Root } from 'react-dom/client';

export interface BaseFileLoginPanelState<T> {
  root: Root;
  isOpen: boolean;
  resolveFn: ((resolvedValue: T) => void) | null;
  anchor: HTMLElement | undefined;
}

export interface BaseFileLoginReturn {
  privateKey: string;
  address: string;
}

export abstract class BaseFileLoginPanel<
  TReturn extends BaseFileLoginReturn,
  TOptions = any
> {
  protected _panelRoot: HTMLDivElement;
  protected _currentPanel: BaseFileLoginPanelState<TReturn> | null = null;

  constructor() {
    this._panelRoot = document.createElement('div');
    document.body.appendChild(this._panelRoot);
    this._initializePanel();
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

  protected _renderPanel(options?: TOptions) {
    if (!this._currentPanel) {
      return;
    }

    const onSubmit = (values: TReturn) => {
      if (!this._currentPanel) {
        return;
      }

      this._currentPanel.isOpen = false;
      this._currentPanel.resolveFn?.(values);
      this._renderPanel(options);
    };

    const onClose = () => {
      if (!this._currentPanel) {
        return;
      }

      this._currentPanel.isOpen = false;
      this._currentPanel.resolveFn?.(this.getDefaultCloseValues());
      this._renderPanel(options);
    };

    this._currentPanel.root.render(
      this.renderPanelContent({
        isOpen: this._currentPanel.isOpen,
        onSubmit,
        onClose,
        anchor: this._currentPanel.anchor,
        options
      })
    );
  }

  protected abstract renderPanelContent(props: {
    isOpen: boolean;
    onSubmit: (values: TReturn) => void;
    onClose: () => void;
    anchor: HTMLElement | undefined;
    options?: TOptions;
  }): ReactElement;

  protected abstract getDefaultCloseValues(): TReturn;

  public showPanel(options?: TOptions): Promise<TReturn> {
    return new Promise((resolve) => {
      if (!this._currentPanel) {
        return Promise.reject(new Error('Panel not initialized'));
      }

      this._currentPanel.resolveFn = resolve;
      this._currentPanel.isOpen = true;
      this._currentPanel.anchor = (options as any)?.anchor;
      this._renderPanel(options);
    });
  }
}
