import React from 'react';
import { createRoot, Root } from 'react-dom/client';
import PanelWrapper from './PanelWrapper';

interface KeystoreLoginPanelState {
  root: Root;
  isOpen: boolean;
  resolve: ((value: { privateKey: string; address: string }) => void) | null;
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

  private _renderPanel() {
    if (!this._currentPanel) {
      return;
    }

    this._currentPanel.root.render(
      <PanelWrapper
        isOpen={this._currentPanel.isOpen}
        onSubmit={(values: { privateKey: string; address: string }) => {
          if (!this._currentPanel) {
            return;
          }

          this._currentPanel.isOpen = false;
          this._currentPanel.resolve?.(values);
          this._renderPanel();
        }}
        onClose={() => {
          if (!this._currentPanel) {
            return;
          }

          this._currentPanel.isOpen = false;
          this._currentPanel.resolve?.({ privateKey: '', address: '' });
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
      if (!this._currentPanel) {
        return Promise.reject(new Error('Panel not initialized'));
      }

      this._currentPanel.resolve = resolve;
      this._currentPanel.isOpen = true;
      this._currentPanel.anchor = options?.anchor;
      this._renderPanel();
    });
  }
}
