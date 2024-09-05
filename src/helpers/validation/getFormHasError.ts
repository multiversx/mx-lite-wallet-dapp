export const getFormHasError = ({
  form,
  fieldName
}: {
  form: { touched: Record<string, any>; errors: Record<string, any> };
  fieldName: string;
}) => form.touched[fieldName] && form.errors[fieldName];
