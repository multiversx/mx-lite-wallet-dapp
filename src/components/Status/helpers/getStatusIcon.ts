import {
  faInfo,
  faCheck,
  faHourglass,
  faTimes
} from '@fortawesome/free-solid-svg-icons';

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
