export const retry = (props: {
  fn: () => any;
  retries: number;
  error: string;
}) => {
  const { fn, error = '', retries = 3 } = props;

  if (!retries) {
    return Promise.reject(error);
  }

  return fn().catch((err: any) => {
    return setTimeout(() => {
      retry({ fn, error: err, retries: retries - 1 });
    }, 100);
  });
};
