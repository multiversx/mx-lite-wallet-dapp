import {
  faCheck,
  faHourglass,
  faTimes
} from '@fortawesome/pro-regular-svg-icons';
import { faInfo } from '@fortawesome/pro-solid-svg-icons';

import { StatusTypeEnum } from '../status.types';

export const getStatusIcon = (type: StatusTypeEnum) => {
  if (type === StatusTypeEnum.success) {
    return faCheck;
  }

  if (type === StatusTypeEnum.fail) {
    return faTimes;
  }

  if (type === StatusTypeEnum.info) {
    return faInfo;
  }

  return faHourglass;
};
