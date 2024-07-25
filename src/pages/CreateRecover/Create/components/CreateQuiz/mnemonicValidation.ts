import { object, string } from 'yup';
import { getCompareObject } from './getCompareObject';

export const mnemonicValidation = (
  compareObject: ReturnType<typeof getCompareObject>
) =>
  object().shape({
    first: string().test(
      'match',
      'Invalid words',
      (value) => value === compareObject.first.value
    ),
    second: string().test(
      'match',
      'Invalid words',
      (value) => value === compareObject.second.value
    ),
    third: string().test(
      'match',
      'Invalid words',
      (value) => value === compareObject.third.value
    )
  });
