import { ReactElement } from 'react';
import { KeystorePanel } from 'components/KeystorePanel';
import { PanelWrapper } from 'components/PanelWrapper';
import { BaseFileLoginPanel, BaseFileLoginReturn } from '../BaseFileLoginPanel';

interface IKeystorePanelReturn extends BaseFileLoginReturn {
  privateKey: string;
  address: string;
  keystoreFile?: string;
  keystoreFileName?: string;
  addressIndex?: number;
}

interface IKeystoreLoginOptions {
  needsAddress?: boolean;
  anchor?: HTMLElement;
  savedKeystoreFile?: string;
  keystoreFileName?: string;
}

export class KeystoreLoginPanel extends BaseFileLoginPanel<
  IKeystorePanelReturn,
  IKeystoreLoginOptions
> {
  private static instance: KeystoreLoginPanel;

  private constructor() {
    super();
  }

  public static getInstance(): KeystoreLoginPanel {
    if (!KeystoreLoginPanel.instance) {
      KeystoreLoginPanel.instance = new KeystoreLoginPanel();
    }
    return KeystoreLoginPanel.instance;
  }

  protected renderPanelContent({
    isOpen,
    onSubmit,
    onClose,
    anchor,
    options
  }: {
    isOpen: boolean;
    onSubmit: (values: IKeystorePanelReturn) => void;
    onClose: () => void;
    anchor: HTMLElement | undefined;
    options?: IKeystoreLoginOptions;
  }): ReactElement {
    return (
      <PanelWrapper
        isOpen={isOpen}
        onClose={onClose}
        anchor={anchor}
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

  protected getDefaultCloseValues(): IKeystorePanelReturn {
    return { privateKey: '', address: '' };
  }
}
