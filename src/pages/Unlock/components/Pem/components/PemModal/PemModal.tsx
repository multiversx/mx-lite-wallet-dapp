import { useEffect } from 'react';
import { faFileAlt } from '@fortawesome/free-solid-svg-icons';
import { Formik, FormikHelpers } from 'formik';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import { mixed, object } from 'yup';
import { Button, ModalContainer, PageState } from 'components';
import { UseModalReturnType, useCloseModalOnEsc } from 'hooks';
import { useInitToken, useOnFileLogin } from 'pages/Unlock/hooks';
import { accountSelector, hookSelector } from 'redux/selectors';
import { setPemLogin } from 'redux/slices';
import { routeNames } from 'routes';
import { parsePem } from './helpers';
import { DataTestIdsEnum } from '../../../../../../localConstants';

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
    <ModalContainer onClose={handleModalClose} visible={show}>
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
                    console.log('data', data, address);

                    return data?.address === address;
                  }
                )
            })}
          >
            {(formikProps) => {
              const { submitForm, errors, isValid, setFieldValue } =
                formikProps;

              return (
                <div className='flex flex-col mx-auto items-center'>
                  <label htmlFor='pem' className='mb-2'>
                    Select file
                  </label>
                  <input
                    accept='.pem'
                    className='border border-dotted border-gray-500 hover:border-solid hover:border-gray-800 mb-4 p-1'
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
                  <div className='flex flex-col mx-auto items-center gap-2 mt-4'>
                    <Button
                      data-testid={DataTestIdsEnum.submitButton}
                      disabled={!isValid}
                      onClick={submitForm}
                      type='submit'
                    >
                      Submit
                    </Button>
                    <button
                      className='mt-2'
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
