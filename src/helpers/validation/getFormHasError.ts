interface FormHasErrorType {
  touched: Record<string, any>;
  errors: Record<string, any>;
}

export const getFormHasError =
  (form: FormHasErrorType) => (fieldName: string) =>
    form.touched[fieldName] && form.errors[fieldName];
