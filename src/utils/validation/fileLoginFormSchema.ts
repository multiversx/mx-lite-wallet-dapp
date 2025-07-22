import { object, string, mixed } from 'yup';

export const fileLoginFormSchema = () =>
  object().shape({
    file: mixed()
      .nullable()
      .test('required', 'Please select a file', (value) => Boolean(value)),
    password: string()
      .nullable()
      .test('isNull', 'Wrong password', (value) => value !== null)
      .required('Required')
      .test('min', 'Password is required', (value) =>
        Boolean(value && value.length > 0)
      )
  });