import { ReactElement } from 'react';
import PanelWrapper from 'components/PanelWrapper/PanelWrapper';
import { PemPanel } from 'components/PemPanel';
import { BaseFileLoginPanel, BaseFileLoginReturn } from '../BaseFileLoginPanel';

interface IPemPanelReturn extends BaseFileLoginReturn {
  privateKey: string;
  address: string;
}

interface IPemLoginOptions {
  needsAddress?: boolean;
  anchor?: HTMLElement;
}

export class PemLoginPanel extends BaseFileLoginPanel<
  IPemPanelReturn,
  IPemLoginOptions
> {
  private static instance: PemLoginPanel;

  private constructor() {
    super();
  }

  public static getInstance(): PemLoginPanel {
    if (!PemLoginPanel.instance) {
      PemLoginPanel.instance = new PemLoginPanel();
    }
    return PemLoginPanel.instance;
  }

  protected renderPanelContent({
    isOpen,
    onSubmit,
    onClose,
    anchor
  }: {
    isOpen: boolean;
    onSubmit: (values: IPemPanelReturn) => void;
    onClose: () => void;
    anchor: HTMLElement | undefined;
  }): ReactElement {
    return (
      <PanelWrapper
        isOpen={isOpen}
        onClose={onClose}
        anchor={anchor}
        panelTitle='PEM Login'
      >
        <PemPanel onSubmit={onSubmit} onClose={onClose} />
      </PanelWrapper>
    );
  }

  protected getDefaultCloseValues(): IPemPanelReturn {
    return { privateKey: '', address: '' };
  }
}
