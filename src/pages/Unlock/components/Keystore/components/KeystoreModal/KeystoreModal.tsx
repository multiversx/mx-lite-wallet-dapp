import React, { useEffect, useState } from 'react';
import { faFileAlt } from '@fortawesome/free-solid-svg-icons';
import { useSelector } from 'react-redux';
import { Button, ModalContainer, PageState } from 'components';
import { UseModalReturnType } from 'hooks';
import { useInitToken, useOnFileLogin } from 'pages/Unlock/hooks';
import { accountSelector, hookSelector } from 'redux/selectors';
import { AddressScreens } from './components';
import { accessWallet, parseKeystoreJSON } from './helpers';

interface AccessWalletType {
  kdContent: { [key: string]: any };
  accessPassVal: string;
}

export const KeystoreModal = ({ handleClose, show }: UseModalReturnType) => {
  const [file, setFile] = useState<File | null>(null);
  const [fileName, setFileName] = useState<string>();
  const [password, setPassword] = useState<string>();
  const [walletFileV5andPassword, setWalletFileV5andPassword] =
    useState<AccessWalletType | null>();
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
      setFileName(e.target.files[0].name);
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

    const accountData = accessWallet({
      kdContent: data,
      accessPassVal: String(password),
      index: 0
    });

    if (accountData == null) {
      return setError('Please check your uploaded file or password');
    }

    if (data.kind === 'mnemonic') {
      return setWalletFileV5andPassword({
        kdContent: data,
        accessPassVal: String(password)
      });
    }

    onFileLogin({
      address: data.address,
      privateKey: data.privateKey,
      token
    });
  };

  if (walletFileV5andPassword) {
    return (
      <ModalContainer onClose={handleClose} visible={show}>
        <PageState
          icon={faFileAlt}
          iconSize='3x'
          title='Login using PEM'
          description={
            <AddressScreens
              {...walletFileV5andPassword}
              fileName={fileName || ''}
            />
          }
        />
      </ModalContainer>
    );
  }

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
