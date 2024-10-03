interface Form {
  touched: Record<string, any>;
  errors: Record<string, any>;
}

export const getFormHasError = ({
  form,
  fieldName
}: {
  form: Form;
  fieldName: string;
}) => form.touched[fieldName] && form.errors[fieldName];
