import { useFormik } from 'formik';
import { SendForm } from './components';
import { useSendForm } from './hooks';
import { SendFormType } from './types';

export const Send = () => {
  const {
    availableAmount,
    canEditNftAmount,
    formik,
    handleTypeChange,
    isEgldToken,
    isLoading,
    isNFT,
    tokenOptions
  } = useSendForm();

  return (
    <div className='flex flex-col p-6 max-w-2xl w-full bg-white shadow-md rounded h-full'>
      <h2 className='text-2xl font-bold p-2 mb-2 text-center'>Send</h2>
      <SendForm
        availableAmount={availableAmount}
        canEditNftAmount={canEditNftAmount}
        formik={formik as ReturnType<typeof useFormik<SendFormType>>}
        handleTypeChange={handleTypeChange}
        isEgldToken={isEgldToken}
        isLoading={isLoading}
        isNFT={isNFT}
        tokenOptions={tokenOptions}
      />
    </div>
  );
};
