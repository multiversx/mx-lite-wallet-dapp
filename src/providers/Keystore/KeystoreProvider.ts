import { ProviderType } from 'lib/sdkDapp';
import { setKeystoreLogin } from 'redux/slices/account';
import { store } from 'redux/store';
import { FileProviderEnum, IFileProviderOptions } from 'types/providers';
import { KeystoreLoginPanel } from './KeystoreLoginPanel';
import { FileProvider } from '../FileProvider';

export class KeystoreProvider extends FileProvider {
  private panel = KeystoreLoginPanel.getInstance();

  constructor(options?: IFileProviderOptions) {
    super(options);
  }

  getType(): ProviderType {
    return FileProviderEnum.KEYSTORE as unknown as ProviderType;
  }

  protected async showLoginPanel(): Promise<{
    address: string;
    privateKey: string;
    keystoreFile?: any;
    keystoreFileName?: string;
    addressIndex?: number;
  }> {
    return await this.panel.showPanel({
      needsAddress: true,
      anchor: this._anchor
    });
  }

  protected async showReloginPanel(): Promise<{
    privateKey: string;
  }> {
    const state = store.getState();
    const savedKeystoreFile = state.account.keystoreFile;
    const savedKeystoreFileName = state.account.keystoreFileName;

    return await this.panel.showPanel({
      savedKeystoreFile,
      keystoreFileName: savedKeystoreFileName
    });
  }

  protected handleLoginResult(result: {
    keystoreFile?: any;
    keystoreFileName?: string;
    addressIndex?: number;
    privateKey: string;
  }): void {
    if (result.keystoreFile) {
      store.dispatch(
        setKeystoreLogin({
          privateKey: result.privateKey,
          keystoreFile: result.keystoreFile,
          keystoreFileName: result.keystoreFileName || '',
          addressIndex: result.addressIndex || 0
        })
      );
    }
  }

  protected encodeMessage(message: string): Uint8Array {
    return new Uint8Array(Buffer.from(message));
  }

  protected formatSignature(signature: Uint8Array): string {
    return Buffer.from(signature).toString('hex');
  }
}
