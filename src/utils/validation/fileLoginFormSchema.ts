import { object, string, mixed } from 'yup';

export const fileLoginFormSchema = () =>
  object().shape({
    file: mixed()
      .nullable()
      .test('required', 'Please select a file', (value) => Boolean(value)),
    password: string().nullable()
  });
