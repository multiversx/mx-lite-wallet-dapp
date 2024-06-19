import { useEffect } from 'react';
import { faFileAlt } from '@fortawesome/free-solid-svg-icons';
import { Formik, FormikHelpers } from 'formik';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import { mixed, object } from 'yup';
import { Button, ModalContainer, PageState } from 'components';
import { UseModalReturnType, useCloseModalOnEsc } from 'hooks';
import { DataTestIdsEnum } from 'localConstants';
import { useInitToken, useOnFileLogin } from 'pages/Unlock/hooks';
import { accountSelector, hookSelector } from 'redux/selectors';
import { setPemLogin } from 'redux/slices';
import { routeNames } from 'routes';
import { parsePem } from './helpers';

const PEM_FIELD = 'pem';

type PemValuesType = {
  pem: File | null;
};

const initialValues: PemValuesType = {
  [PEM_FIELD]: null
};

export const PemModal = ({ handleClose, show }: UseModalReturnType) => {
  const getInitToken = useInitToken();
  const { token: initToken, address } = useSelector(accountSelector);
  const dispatch = useDispatch();
  const { type: hook, loginToken: hookInitToken } = useSelector(hookSelector);
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const handleModalClose = () => {
    handleClose();

    const shouldLogoutIfReloginNotConfirmed =
      address && pathname !== routeNames.unlock;

    if (shouldLogoutIfReloginNotConfirmed) {
      navigate(routeNames.logout);
    }
  };
  useCloseModalOnEsc({
    onClose: handleModalClose,
    isOpen: show
  });

  const token = hook ? hookInitToken : initToken;

  const onFileLogin = useOnFileLogin();

  useEffect(() => {
    if (hook) {
      return;
    }
    getInitToken();
  }, [hook]);

  const onSubmit = async (
    values: PemValuesType,
    props: FormikHelpers<PemValuesType>
  ) => {
    const data = await parsePem(values.pem);
    if (data == null) {
      return props.setFieldError('pem', 'Please check your loaded file');
    }
    dispatch(setPemLogin(data.privateKey));
    await onFileLogin({
      address: data.address,
      privateKey: data.privateKey,
      token
    });
    handleClose();
  };

  return (
    <ModalContainer
      className='login-modal'
      onClose={handleModalClose}
      visible={show}
    >
      <PageState
        icon={faFileAlt}
        iconSize='3x'
        title='Login using PEM'
        description={
          <Formik
            initialValues={initialValues}
            onSubmit={onSubmit}
            validationSchema={object().shape({
              pem: mixed()
                .required('Required')
                .test('isFile', 'Invalid pem file', (value) => {
                  const isValid = value && value !== null;
                  return isValid;
                })
                .test(
                  'sameAccount',
                  'This is not the wallet you initiated the transaction with',
                  async (file) => {
                    if (!file || !address) {
                      return true;
                    }
                    const data = await parsePem(file as File);

                    return data?.address === address;
                  }
                )
            })}
          >
            {(formikProps) => {
              const { submitForm, errors, isValid, setFieldValue } =
                formikProps;

              return (
                <div className='flex flex-col mx-auto items-center pt-6'>
                  <label
                    className='block text-gray-700 text-sm font-bold mb-2'
                    htmlFor='pem'
                  >
                    Choose File
                  </label>
                  <input
                    accept='.pem'
                    className='w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500'
                    data-testid={DataTestIdsEnum.walletFile}
                    id='pem'
                    name='pem'
                    onChange={(e) => {
                      const file = e.target.files?.[0];
                      if (file) {
                        setFieldValue(PEM_FIELD, file);
                      }
                    }}
                    required
                    type='file'
                  />
                  {errors.pem && (
                    <div className='text-red-600 mb-4'>{errors.pem}</div>
                  )}
                  <div className='flex flex-col mx-auto items-center gap-2 mt-8'>
                    <Button
                      data-testid={DataTestIdsEnum.submitButton}
                      disabled={!isValid}
                      onClick={submitForm}
                      type='submit'
                    >
                      Submit
                    </Button>
                    <button
                      className='mt-2 text-blue-600'
                      data-testid={DataTestIdsEnum.closeButton}
                      id={DataTestIdsEnum.closeButton}
                      onClick={handleModalClose}
                      type='button'
                    >
                      Close
                    </button>
                  </div>
                </div>
              );
            }}
          </Formik>
        }
      />
    </ModalContainer>
  );
};
