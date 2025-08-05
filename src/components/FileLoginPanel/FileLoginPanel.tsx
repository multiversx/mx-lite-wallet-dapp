import { ChangeEvent, ReactNode } from 'react';
import { Formik, Form, FormikProps } from 'formik';
import { DataTestIdsEnum } from 'localConstants/dataTestIds.enum';
import { fileLoginFormSchema } from 'utils';

const styles = {
  container: {
    width: '100%',
    height: '100%',
    maxWidth: '400px',
    margin: '0 auto',
    padding: '24px 0',
    display: 'flex',
    flexDirection: 'column' as const,
    alignItems: 'stretch'
  },
  form: {
    display: 'flex',
    flexDirection: 'column' as const,
    gap: '20px',
    width: '100%'
  },
  input: {
    padding: '10px',
    marginTop: '6px',
    width: '100%',
    borderRadius: '6px',
    border: '1px solid #333',
    background: '#18181b',
    color: '#fff',
    fontSize: '16px'
  },
  buttonGroup: {
    display: 'flex',
    gap: '12px',
    justifyContent: 'flex-end',
    marginTop: '10px'
  },
  button: {
    backgroundColor: '#232326',
    color: '#fff',
    padding: '10px 24px',
    borderRadius: '8px',
    border: '1px solid #333',
    cursor: 'pointer',
    fontSize: '16px',
    fontWeight: 500,
    transition: 'background 0.2s, border 0.2s'
  },
  fileUpload: {
    border: '2px dashed #333',
    borderRadius: '8px',
    padding: '18px',
    textAlign: 'center' as const,
    cursor: 'pointer',
    background: '#232326',
    color: '#fff',
    fontSize: '16px',
    marginTop: '6px'
  },
  label: {
    fontWeight: 500,
    fontSize: '15px',
    color: '#fff',
    marginBottom: '4px',
    display: 'block'
  },
  error: {
    color: 'red',
    fontSize: '14px',
    marginTop: '-10px',
    marginBottom: '10px'
  }
};

export interface FileLoginFormValues {
  file: File | null;
  password: string;
}

export interface FileLoginPanelProps {
  onSubmit: (values: FileLoginFormValues) => void;
  onClose: () => void;
  fileName: string;
  onFileChange: (e: ChangeEvent<HTMLInputElement>) => void;
  fileLabel: string;
  fileAccept: string;
  fileInputId: string;
  placeholder: string;
  dataTestId: string;
  fileUploadTestId: string;
  children?:
    | ReactNode
    | ((formikProps: FormikProps<FileLoginFormValues>) => ReactNode);
  initialValues?: Partial<FileLoginFormValues>;
  error?: string;
  skipValidation?: boolean;
}

export const FileLoginPanel = ({
  onSubmit,
  onClose,
  fileName,
  onFileChange,
  fileLabel,
  fileAccept,
  fileInputId,
  placeholder,
  dataTestId,
  fileUploadTestId,
  children,
  initialValues = { file: null, password: '' },
  error,
  skipValidation = false
}: FileLoginPanelProps) => {
  const defaultInitialValues: FileLoginFormValues = {
    file: null,
    password: '',
    ...initialValues
  };

  return (
    <div style={styles.container} data-testid={dataTestId}>
      <Formik
        initialValues={defaultInitialValues}
        validationSchema={skipValidation ? undefined : fileLoginFormSchema()}
        onSubmit={onSubmit}
      >
        {(formikProps: FormikProps<FileLoginFormValues>) => (
          <Form style={styles.form}>
            <div>
              <label style={styles.label}>{fileLabel}</label>
              <div style={styles.fileUpload} data-testid={fileUploadTestId}>
                <input
                  type='file'
                  accept={fileAccept}
                  onChange={(e) => {
                    onFileChange(e);
                    const file = e.target.files?.[0] || null;
                    formikProps.setFieldValue('file', file);
                  }}
                  style={{ display: 'none' }}
                  id={fileInputId}
                  data-testid={DataTestIdsEnum.walletFile}
                />
                <label
                  htmlFor={fileInputId}
                  style={{ cursor: 'pointer', width: '100%', display: 'block' }}
                >
                  {fileName ? (
                    <div>
                      <div>✓ {fileLabel} loaded</div>
                      <div style={{ fontSize: '14px', color: '#aaa' }}>
                        {fileName}
                      </div>
                    </div>
                  ) : (
                    placeholder
                  )}
                </label>
              </div>
              {formikProps.errors.file && formikProps.touched.file && (
                <div style={styles.error}>{formikProps.errors.file}</div>
              )}
              {error && <div style={styles.error}>{error}</div>}
            </div>

            {children &&
              typeof children === 'function' &&
              children(formikProps)}

            <div style={styles.buttonGroup}>
              <button
                onClick={onClose}
                style={styles.button}
                data-testid={DataTestIdsEnum.cancelBtn}
                type='button'
              >
                Cancel
              </button>
              <button
                type='submit'
                style={styles.button}
                data-testid={DataTestIdsEnum.submitButton}
                disabled={
                  skipValidation
                    ? formikProps.isSubmitting
                    : !formikProps.isValid || formikProps.isSubmitting
                }
              >
                Login
              </button>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};
