import { ReactElement } from 'react';
import { createRoot } from 'react-dom/client';

export interface BaseFileLoginReturn {
  privateKey: string;
  address: string;
}

export abstract class BaseFileLoginPanel<
  TReturn extends BaseFileLoginReturn,
  TOptions = any
> {
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
      const panelRoot = document.createElement('div');
      document.body.appendChild(panelRoot);
      const root = createRoot(panelRoot);

      const handleSubmit = (values: TReturn) => {
        root.unmount();
        if (panelRoot.parentNode) {
          panelRoot.parentNode.removeChild(panelRoot);
        }
        resolve(values);
      };

      const handleClose = () => {
        root.unmount();
        if (panelRoot.parentNode) {
          panelRoot.parentNode.removeChild(panelRoot);
        }
        resolve(this.getDefaultCloseValues());
      };

      // First render with isOpen: false for proper initialization
      root.render(
        this.renderPanelContent({
          isOpen: false,
          onSubmit: handleSubmit,
          onClose: handleClose,
          anchor: (options as any)?.anchor,
          options
        }) as any
      );

      // Then immediately update to isOpen: true to trigger the show animation
      setTimeout(() => {
        root.render(
          this.renderPanelContent({
            isOpen: true,
            onSubmit: handleSubmit,
            onClose: handleClose,
            anchor: (options as any)?.anchor,
            options
          }) as any
        );
      }, 0);
    });
  }
}
