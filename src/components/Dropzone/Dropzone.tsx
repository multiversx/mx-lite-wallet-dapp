import React, { MouseEvent } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import classNames from 'classnames';
import { DropEvent, FileRejection, useDropzone } from 'react-dropzone';

import { DropzoneFile } from './components/DropzoneFile';
import { DropzonePropsType } from './dropzone.types';
import { getDropzoneStatusData, handleDropzoneHover } from './helpers';

export const Dropzone = ({
  className,
  acceptedFileTypes,
  acceptMultipleFiles,
  'data-testid': dataTestId,
  onFileDrop,
  onFileRemove,
  onFileRemoveAll,
  files = [],
  successMessage,
  errorMessage,
  disabled
}: DropzonePropsType) => {
  const errorsExist = files.some((file) => file.fileError);
  const filesUploadedSuccessfully = !errorsExist && files.length > 0;

  const { statusIcon, statusLabel } = getDropzoneStatusData({
    errorsExist,
    filesUploadedSuccessfully,
    successMessage
  });

  const { getInputProps, getRootProps, open } = useDropzone({
    accept: acceptedFileTypes,
    multiple: acceptMultipleFiles,
    noKeyboard: true,
    onDragEnter: (event) =>
      handleDropzoneHover({ event, shouldShowHover: true }),
    onDragLeave: (event) =>
      handleDropzoneHover({ event, shouldShowHover: false }),
    onDrop: (
      droppedFiles: File[],
      fileRejections: FileRejection[],
      event: DropEvent
    ) => {
      handleDropzoneHover({ event, shouldShowHover: false });

      if (onFileDrop) {
        onFileDrop(droppedFiles, fileRejections, event);
      }
    }
  });

  const onFileRemoveClick = (
    fileIndex: number,
    event: MouseEvent<HTMLDivElement>
  ) => {
    event.preventDefault();
    event.stopPropagation();

    if (onFileRemove) {
      onFileRemove(fileIndex, event);
    }
  };

  const onFileRemoveAllCallback = (event: MouseEvent<HTMLDivElement>) => {
    event.stopPropagation();

    if (onFileRemoveAll) {
      onFileRemoveAll(event);
    }
  };

  return (
    <div
      {...getRootProps()}
      onClick={open}
      className={classNames('dropzone-new', className, {
        success: filesUploadedSuccessfully,
        error: errorsExist || errorMessage,
        disabled
      })}
    >
      <div className='dropzone-inner'>
        <FontAwesomeIcon
          icon={statusIcon}
          className={classNames('dropzone-icon', {
            error: errorsExist,
            success: Boolean(filesUploadedSuccessfully)
          })}
        />

        <span
          data-testid='statusMessage'
          className={classNames('dropzone-text', {
            error: errorsExist,
            success: filesUploadedSuccessfully
          })}
        >
          <span className='dropzone-text-label'>{statusLabel}</span>

          {files.length === 0 && (
            <span className='dropzone-text-select'>Select a file</span>
          )}
        </span>

        {files.length > 0 && (
          <div className='dropzone-files'>
            {files.map((file, fileIndex) => (
              <DropzoneFile
                key={`${file.fileName}-${fileIndex}`}
                onFileRemove={onFileRemoveClick}
                fileIndex={fileIndex}
                disabled={disabled}
                {...file}
              />
            ))}
          </div>
        )}

        {acceptMultipleFiles && files.length > 1 && (
          <div className='dropzone-footer'>
            <div className='dropzone-footer-total'>Total: {files.length}</div>

            {onFileRemoveAll && (
              <div
                className='dropzone-footer-remove'
                onClick={onFileRemoveAllCallback}
              >
                Remove All
              </div>
            )}
          </div>
        )}
      </div>

      <input {...getInputProps()} data-testid={dataTestId} />

      {errorMessage && (
        <div
          className='modal-layout-error dropzone-error'
          id='dropzoneErrorMessage'
          data-testid='dropzoneErrorMessage'
        >
          {errorMessage}
        </div>
      )}
    </div>
  );
};
