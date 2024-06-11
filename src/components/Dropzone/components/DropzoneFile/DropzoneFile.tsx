import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import classNames from 'classnames';

import { Trim } from 'components';

import { DropzonePropsType, FileType } from '../../dropzone.types';
import { faCheck, faTrash } from '@fortawesome/free-solid-svg-icons';

export interface DropzoneFilePropsType
  extends FileType,
    Required<Pick<DropzonePropsType, 'onFileRemove'>> {
  fileIndex: number;
  disabled?: DropzonePropsType['disabled'];
}

export const DropzoneFile = ({
  onFileRemove,
  fileName,
  fileIndex,
  fileError,
  disabled
}: DropzoneFilePropsType) => (
  <div
    key={fileName}
    onClick={(event) => event.stopPropagation()}
    className={classNames('dropzone-file', {
      error: Boolean(fileError)
    })}
  >
    <div className={classNames('dropzone-file-left', { spaced: !disabled })}>
      <Trim
        className='dropzone-file-trim'
        text={fileName}
        data-testid='dropzoneFileName'
      />

      {fileError && (
        <div className='dropzone-file-error' data-testid='dropzoneFileError'>
          {fileError}
        </div>
      )}

      {!fileError && (
        <div className='dropzone-file-success'>
          <span className='dropzone-file-sucess-text'>Validated</span>

          <FontAwesomeIcon
            className='dropzone-file-success-icon'
            icon={faCheck}
          />
        </div>
      )}
    </div>

    {!disabled && (
      <div className='dropzone-file-right'>
        <div
          onClick={(event) => onFileRemove(fileIndex, event)}
          className={classNames('dropzone-file-remove', {
            error: Boolean(fileError)
          })}
        >
          <FontAwesomeIcon icon={faTrash} />
        </div>
      </div>
    )}
  </div>
);
