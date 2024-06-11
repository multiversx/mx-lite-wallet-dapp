import {
  faArrowUp,
  faCheck,
  faExclamation
} from '@fortawesome/free-solid-svg-icons';

export interface GetDropzoneStatusDataType {
  filesUploadedSuccessfully: boolean;
  errorsExist: boolean;
  successMessage: string;
}

export const getDropzoneStatusData = ({
  errorsExist,
  filesUploadedSuccessfully,
  successMessage
}: GetDropzoneStatusDataType) => {
  if (errorsExist) {
    return {
      statusIcon: faExclamation,
      statusLabel: 'Please check below for file errors.'
    };
  }

  if (filesUploadedSuccessfully) {
    return {
      statusIcon: faCheck,
      statusLabel: successMessage
    };
  }

  return {
    statusIcon: faArrowUp,
    statusLabel: 'Drag and drop here or'
  };
};
