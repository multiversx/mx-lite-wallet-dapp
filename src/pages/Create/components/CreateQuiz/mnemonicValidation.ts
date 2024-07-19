import { t } from 'i18next';
import { object, string } from 'yup';
import { getCompareObject } from './getCompareObject';

export function mnemonicValidation(
  compareObject: ReturnType<typeof getCompareObject>
) {
  const validationSchema = object().shape({
    first: string().test(
      'match',
      t('Invalid words'),
      (value) => value === compareObject.first.value
    ),
    second: string().test(
      'match',
      t('Invalid words'),
      (value) => value === compareObject.second.value
    ),
    third: string().test(
      'match',
      t('Invalid words'),
      (value) => value === compareObject.third.value
    )
  });
  return validationSchema;
}
