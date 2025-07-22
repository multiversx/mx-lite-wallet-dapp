import { IProvider } from 'lib';

export interface IFileProvider {
  name: string;
  type: string;
  iconUrl: string;
  constructor: (options?: IFileProviderOptions) => Promise<IProvider>;
  dataTestId?: string;
}

export interface IFileProviderOptions {
  address?: string;
  anchor?: HTMLElement;
}
