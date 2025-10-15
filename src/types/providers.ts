import { IProvider } from 'lib/sdkDapp';

export interface IFileProvider {
  name: string;
  type: FileProviderEnum;
  iconUrl: string;
  constructor: (options?: IFileProviderOptions) => Promise<IProvider>;
  dataTestId?: string;
}

export interface IFileProviderOptions {
  address?: string;
  anchor?: HTMLElement;
}

export enum FileProviderEnum {
  PEM = 'pemProvider',
  KEYSTORE = 'keystoreProvider'
}
