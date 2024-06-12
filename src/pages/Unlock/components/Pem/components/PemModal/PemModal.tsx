import React, { useState } from 'react';
import { faFileAlt } from '@fortawesome/free-solid-svg-icons';
import { Button, ModalContainer, PageState } from 'components';
import { parsePem } from './helpers';

interface DepositModalPropsType {
  handleClose: () => void;
  show: boolean;
}

export const PemModal = ({ handleClose, show }: DepositModalPropsType) => {
  const [file, setFile] = useState<File | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFile(e.target.files[0]);
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = await parsePem(file);
    if (data == null) {
      return setError('Please check your loaded file');
    }
    console.log(11, { data });
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
