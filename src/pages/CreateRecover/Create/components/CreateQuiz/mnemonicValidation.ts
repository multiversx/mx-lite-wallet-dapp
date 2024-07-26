import { object } from 'yup';
import { getCompareObject } from './getCompareObject';

export const mnemonicValidation = (
  compareObject: ReturnType<typeof getCompareObject>
) =>
  object().shape({
    first: object()
      .required()
      .test(
        'match',
        'Invalid words',
        (value) =>
          (value as { label: string; value: string })?.value ===
          compareObject.first.value
      ),
    second: object()
      .required()
      .test(
        'match',
        'Invalid words',
        (value) =>
          (value as { label: string; value: string })?.value ===
          compareObject.second.value
      ),
    third: object()
      .required()
      .test(
        'match',
        'Invalid words',
        (value) =>
          (value as { label: string; value: string })?.value ===
          compareObject.third.value
      )
  });
