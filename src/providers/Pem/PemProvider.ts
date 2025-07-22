import { ProviderType } from '@multiversx/sdk-dapp/out/providers/types/providerFactory.types';
import { IFileProviderOptions } from 'types/providers';
import { PemLoginPanel } from './PemLoginPanel';
import { FileProvider } from '../FileProvider';

export class PemProvider extends FileProvider {
  private panel = PemLoginPanel.getInstance();

  constructor(options?: IFileProviderOptions) {
    super(options);
  }

  getType(): ProviderType {
    return '' as unknown as ProviderType;
  }

  protected async showLoginPanel(): Promise<{
    address: string;
    privateKey: string;
  }> {
    return await this.panel.showPanel({
      needsAddress: true,
      anchor: this._anchor
    });
  }

  protected async showReloginPanel(): Promise<{
    privateKey: string;
  }> {
    return await this.panel.showPanel();
  }

  protected handleLoginResult(): void {
    // PEM provider doesn't need to store additional login data
  }

  protected encodeMessage(message: string): Uint8Array {
    return new TextEncoder().encode(message);
  }

  protected formatSignature(signature: Uint8Array): string {
    return Array.from(signature)
      .map((b) => b.toString(16).padStart(2, '0'))
      .join('');
  }
}
