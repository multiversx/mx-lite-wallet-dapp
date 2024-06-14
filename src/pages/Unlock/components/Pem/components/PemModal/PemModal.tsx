import { useEffect, useState } from 'react';
import { faFileAlt } from '@fortawesome/free-solid-svg-icons';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import { Button, ModalContainer, PageState } from 'components';
import { UseModalReturnType } from 'hooks';
import { useInitToken, useOnFileLogin } from 'pages/Unlock/hooks';
import { accountSelector, hookSelector } from 'redux/selectors';
import { setPemLogin } from 'redux/slices';
import { routeNames } from 'routes';
import { parsePem } from './helpers';

export const PemModal = ({ handleClose, show }: UseModalReturnType) => {
  const getInitToken = useInitToken();
  const { token: initToken, address } = useSelector(accountSelector);
  const dispatch = useDispatch();
  const { type: hook, loginToken: hookInitToken } = useSelector(hookSelector);
  const navigate = useNavigate();
  const { pathname } = useLocation();

  const [file, setFile] = useState<File | null>(null);
  const [error, setError] = useState<string | null>(null);

  const token = hook ? hookInitToken : initToken;

  const onFileLogin = useOnFileLogin();

  useEffect(() => {
    if (hook) {
      return;
    }
    getInitToken();
  }, [hook]);

  const handleModalClose = () => {
    handleClose();
    if (!address && pathname !== routeNames.unlock) {
      navigate(routeNames.logout);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFile(e.target.files[0]);
      setError(null);
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = await parsePem(file);
    if (data == null) {
      return setError('Please check your loaded file');
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
          <form
            className='flex flex-col mx-auto items-center'
            onSubmit={handleSubmit}
          >
            <label htmlFor='pem' className='mb-2'>
              Select file
            </label>
            <input
              className='border border-dotted border-gray-500 hover:border-solid hover:border-gray-800 mb-4 p-1'
              type='file'
              required
              id='pem'
              name='pem'
              accept='.pem'
              onChange={handleFileChange}
            />
            {error && <div className='text-red-600 mb-4'>{error}</div>}
            <div className='flex flex-col mx-auto items-center gap-2 mt-4'>
              <Button
                data-testid='submitButton'
                type='submit'
                onClick={() => {}}
              >
                Submit
              </Button>
              <button
                id='closeButton'
                data-testid='closeButton'
                onClick={handleClose}
                type='button'
                className='mt-2'
              >
                Close
              </button>
            </div>
          </form>
        }
      />
    </ModalContainer>
  );
};
