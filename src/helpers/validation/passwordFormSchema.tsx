import { object, string, ref } from 'yup';

export const passwordFormSchema = () =>
  passwordLoginFormSchema().concat(
    object().shape({
      passwordRepeat: string()
        .required('Required')
        .oneOf([ref('password')], 'Passwords do not match')
    })
  );

export const passwordLoginFormSchema = () =>
  object().shape({
    password: string()
      .nullable()
      .test('isNull', 'Wrong password', (value) => value !== null)
      .required('Required')
      .test('min', 'At least 8 characters', (value) =>
        Boolean(value && value.length >= 8)
      )
      .test('max', 'Maximum 1000 characters', (value) =>
        Boolean(value && value.length <= 1000)
      )
      .matches(/^(.*[A-Z].*)$/, 'Must contain one uppercase character')
      .matches(/^(.*[a-z].*)$/, 'Must contain one lowercase character')
      .matches(/^(.*\d.*)$/, 'Must contain one number')
      .test('char', 'Must contain one special character', (val) =>
        Boolean(val && !val.match(/^\w+$/))
      )
  });
