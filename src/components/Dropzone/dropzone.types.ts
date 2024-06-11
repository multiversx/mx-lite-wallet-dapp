import { MouseEvent } from 'react';
import { DropzoneOptions } from 'react-dropzone';

import { WithClassnameType } from 'types';

export enum AcceptedFileTypeEnum {
  imageJpeg = 'image/jpeg',
  imagePng = 'image/png',
  imageWebp = 'image/webp',
  imageGif = 'image/gif',
  imageJpg = 'image/jpg',
  audioAac = 'audio/aac',
  audioFlac = 'audio/flac',
  audioM4a = 'audio/m4a',
  audioMpeg = 'audio/mpeg',
  audioWav = 'audio/wav',
  videoMov = 'video/mov',
  videoQuicktime = 'video/quicktime',
  videoMp4 = 'video/mp4',
  videoWebm = 'video/webmw',
  pem = '.pem',
  json = '.json',
  applicationJson = '.application/json'
}

export type DropzoneFilesErrorsType = Record<string, string>;

export interface FileType {
  fileName: string;
  fileError?: string;
}

export interface DropzonePropsType extends WithClassnameType {
  acceptedFileTypes: AcceptedFileTypeEnum[];
  acceptMultipleFiles?: DropzoneOptions['multiple'];
  files?: FileType[];
  successMessage: string;
  onFileDrop: DropzoneOptions['onDrop'];
  onFileRemoveAll?: (event: MouseEvent<HTMLDivElement>) => void;
  onFileRemove?: (fileIndex: number, event: MouseEvent<HTMLDivElement>) => void;
  errorMessage?: string;
  disabled?: boolean;
}
