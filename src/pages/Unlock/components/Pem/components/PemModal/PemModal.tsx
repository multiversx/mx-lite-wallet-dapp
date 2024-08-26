import { useEffect, useState } from 'react';
import { faCheck, faPencilAlt } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import classNames from 'classnames';
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
  const [fileName, setFileName] = useState('');

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
      className='login-modal p-6'
      onClose={handleModalClose}
      visible={show}
    >
      <PageState
        description={
          <Formik
            initialValues={initialValues}
            onSubmit={onSubmit}
            validationSchema={object().shape({
              pem: mixed()
                .required('PEM file is required')
                .test('isFile', 'Invalid pem file', (value) => Boolean(value))
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
              const { submitForm, errors, setFieldValue, touched } =
                formikProps;

              return (
                <div className='flex flex-col items-center'>
                  <h2 className='text-2xl mt-4 mb-2'>Login using PEM</h2>
                  <label
                    htmlFor='pem'
                    className='block text-gray-500 text-sm font-bold mb-4'
                  >
                    Select a PEM file
                  </label>
                  <div
                    className={classNames(
                      'w-full my-6 flex flex-col border-dashed border-2 rounded-md p-6 flex items-center justify-center mb-4 h-[200px]',
                      {
                        'border-gray-300': !errors.pem,
                        'border-red-300': errors.pem
                      }
                    )}
                  >
                    {fileName && (
                      <div className='flex flex-row items-center gap-1'>
                        <FontAwesomeIcon
                          className='text-green-500'
                          icon={faCheck}
                        />
                        <span className='text-green-500'>PEM loaded</span>
                      </div>
                    )}
                    <input
                      accept='.pem'
                      className='hidden'
                      id='pem'
                      name='pem'
                      type='file'
                      data-testid={DataTestIdsEnum.walletFile}
                      onChange={(e) => {
                        const file = e.target.files?.[0];
                        if (file) {
                          setFileName(file.name);
                          setFieldValue(PEM_FIELD, file);
                        }
                      }}
                      required
                    />
                    <label htmlFor='pem' className='text-gray-400 text-sm'>
                      {fileName ? (
                        <div className='flex flex-row items-center cursor-pointer gap-1'>
                          <span>{fileName}</span>
                          <FontAwesomeIcon icon={faPencilAlt} />
                        </div>
                      ) : errors[PEM_FIELD] ? (
                        <div className='text-red-500 mt-2 text-sm'>
                          {errors[PEM_FIELD] as string}
                        </div>
                      ) : (
                        <span className='cursor-pointer'>
                          Click here to select a file
                        </span>
                      )}
                    </label>
                  </div>

                  {fileName && touched[PEM_FIELD] && errors[PEM_FIELD] && (
                    <div className='text-red-500 mt-2 text-sm'>
                      {errors[PEM_FIELD]}
                    </div>
                  )}
                  <div className='flex flex-col items-center gap-2 mt-8'>
                    <Button
                      data-testid={DataTestIdsEnum.submitButton}
                      type='submit'
                      onClick={submitForm}
                    >
                      Access Wallet
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
