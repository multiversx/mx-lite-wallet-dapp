import React, { useEffect, useState } from 'react';
import { faFileAlt } from '@fortawesome/free-solid-svg-icons';
import { useSelector } from 'react-redux';
import { Button, ModalContainer, PageState } from 'components';
import { UseModalReturnType } from 'hooks';
import { useInitToken, useOnFileLogin } from 'pages/Unlock/hooks';
import { accountSelector, hookSelector } from 'redux/selectors';

export const KeystoreModal = ({ handleClose, show }: UseModalReturnType) => {
  const [file, setFile] = useState<File | null>(null);
  const [password, setPassword] = useState<string>();
  const [error, setError] = useState<string | null>(null);
  const getInitToken = useInitToken();
  const { token: initToken } = useSelector(accountSelector);

  const { type: hook, loginToken: hookInitToken } = useSelector(hookSelector);
  const token = hook ? hookInitToken : initToken;

  const onFileLogin = useOnFileLogin();

  useEffect(() => {
    if (hook) {
      return;
    }

    getInitToken();
  }, [hook]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFile(e.target.files[0]);
      setError(null);
    }
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
    setError(null);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = await parseKeystoreJSON(file);
    if (data == null) {
      return setError('Please check your loaded file');
    }

    onFileLogin({
      address: data.address,
      privateKey: data.privateKey,
      token
    });
  };

  return (
    <ModalContainer onClose={handleClose} visible={show}>
      <PageState
        icon={faFileAlt}
        iconSize='3x'
        title='Login using PEM'
        description={
          <form
            className='flex flex-col mx-auto items-center'
            onSubmit={handleSubmit}
          >
            <label htmlFor='keystore' className='mb-2'>
              Keystore file
            </label>
            <input
              className='border border-dotted border-gray-500 hover:border-solid hover:border-gray-800 mb-4 p-1'
              type='file'
              required
              id='keystore'
              name='keystore'
              accept='.json'
              onChange={handleFileChange}
            />
            <label htmlFor='password' className='mb-2'>
              Password
            </label>
            <input
              className='border border-dotted border-gray-500 hover:border-solid hover:border-gray-800 mb-4 p-1'
              type='password'
              required
              id='password'
              name='password'
              onChange={handlePasswordChange}
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
