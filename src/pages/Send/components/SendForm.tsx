import { MouseEvent } from 'react';
import { MvxButton } from '@multiversx/sdk-dapp-ui/react';
import classNames from 'classnames';
import { useNavigate } from 'react-router-dom';
import Select from 'react-select';
import { Button } from 'components';
import { DataTestIdsEnum } from 'localConstants';
import { routeNames } from 'routes';
import { SendTypeEnum } from 'types';
import { getFormHasError } from 'utils';
import { useSendForm } from '../hooks';
import { FormFieldsEnum } from '../types';

export const SendForm = () => {
  const {
    availableAmount,
    canEditNftAmount,
    formik,
    handleOnDataChange,
    handleOnSendTypeChange,
    isEgldToken,
    isLoading,
    isNFT,
    tokenOptions
  } = useSendForm();

  const checkFormHasError = getFormHasError(formik);
  const receiverHasError = checkFormHasError(FormFieldsEnum.receiver);
  const amountHasError = checkFormHasError(FormFieldsEnum.amount);
  const tokenHasError = checkFormHasError(FormFieldsEnum.token);
  const gasLimitHasError = checkFormHasError(FormFieldsEnum.gasLimit);
  const navigate = useNavigate();

  const handleCancel = (event: MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    navigate(routeNames.dashboard);
  };

  return (
    <form onSubmit={formik.handleSubmit}>
      <div className='flex flex-col gap-4 h-full'>
        <div className='flex flex-col'>
          <label
            htmlFor={FormFieldsEnum.receiver}
            className='text-lg font-medium text-secondary transition-all duration-200 ease-out block mb-2'
          >
            Receiver:
          </label>
          <input
            className={classNames(
              'block w-full p-2 text-sm text-primary font-normal bg-secondary transition-all duration-300 rounded-xl placeholder-neutral-500 border border-secondary',
              {
                'border-red-600': receiverHasError
              }
            )}
            data-testid={DataTestIdsEnum.receiverInput}
            id={FormFieldsEnum.receiver}
            name={FormFieldsEnum.receiver}
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
            placeholder='Enter receiver'
            value={formik.values[FormFieldsEnum.receiver]}
          />
          {receiverHasError && (
            <div
              className='text-red-600 text-sm mt-1'
              data-testid={DataTestIdsEnum.receiverError}
            >
              {formik.errors[FormFieldsEnum.receiver]}
            </div>
          )}
        </div>
        <div className='flex flex-col'>
          <label
            htmlFor={FormFieldsEnum.type}
            className='block font-medium text-primary transition-all duration-200 ease-out mb-2'
          >
            Type:
          </label>
          <div className='flex flex-row gap-4'>
            <div>
              <input
                checked={!isNFT}
                className='mr-2'
                data-testid={DataTestIdsEnum.sendEsdtTypeInput}
                id={SendTypeEnum.esdt}
                name={FormFieldsEnum.type}
                onChange={handleOnSendTypeChange(SendTypeEnum.esdt)}
                type='radio'
                value={SendTypeEnum.esdt}
              />
              <label
                htmlFor={SendTypeEnum.esdt}
                className='text-sm text-primary font-normal bg-secondary transition-all duration-300'
              >
                {SendTypeEnum.esdt}
              </label>
            </div>
            <div>
              <input
                checked={isNFT}
                className='mr-2'
                data-testid={DataTestIdsEnum.sendNFtTypeInput}
                id={SendTypeEnum.nft}
                name={FormFieldsEnum.type}
                onChange={handleOnSendTypeChange(SendTypeEnum.nft)}
                type='radio'
                value={SendTypeEnum.nft}
              />
              <label
                htmlFor={SendTypeEnum.nft}
                className='text-sm text-primary font-normal bg-secondary transition-all duration-300'
              >
                {SendTypeEnum.nft}
              </label>
            </div>
          </div>
        </div>
        <div className='flex flex-col'>
          <label
            htmlFor={FormFieldsEnum.amount}
            className='text-lg font-medium text-secondary transition-all duration-200 ease-out block mb-2'
          >
            Amount:
          </label>
          <div className='flex flex-row gap-2'>
            <div className='flex flex-col w-full'>
              <input
                className={classNames(
                  'block w-full p-2 text-sm text-primary font-normal bg-secondary transition-all duration-300 rounded-xl placeholder-neutral-500 border border-secondary',
                  {
                    'border-red-600': amountHasError
                  }
                )}
                disabled={isNFT && !canEditNftAmount}
                data-testid={DataTestIdsEnum.amountInput}
                id={FormFieldsEnum.amount}
                name={FormFieldsEnum.amount}
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                placeholder='Enter amount'
                type='number'
                value={formik.values[FormFieldsEnum.amount]}
              />
              {formik.values[FormFieldsEnum.token] &&
                !formik.errors[FormFieldsEnum.amount] && (
                  <div
                    className='text-sm text-neutral-500 mt-1'
                    data-testid={DataTestIdsEnum.availableAmount}
                  >
                    Available: {availableAmount}{' '}
                    {formik.values[FormFieldsEnum.token]?.label}
                  </div>
                )}
              {amountHasError && (
                <div
                  className='text-red-600 text-sm mt-1'
                  data-testid={DataTestIdsEnum.amountError}
                >
                  {formik.errors[FormFieldsEnum.amount]}
                </div>
              )}
            </div>
            <div className='flex flex-col w-1/2'>
              <Select
                className='text-sm !text-primary !fill-red-500 placeholder-neutral-500'
                isLoading={isLoading}
                options={tokenOptions}
                name={FormFieldsEnum.token}
                onChange={(option) =>
                  formik.setFieldValue(FormFieldsEnum.token, option)
                }
                onBlur={() =>
                  formik.setFieldTouched(FormFieldsEnum.token, true)
                }
                value={formik.values[FormFieldsEnum.token]}
              />
              {tokenHasError && (
                <div
                  className='text-red-600 text-sm mt-1'
                  data-testid={DataTestIdsEnum.tokenError}
                >
                  {formik.errors[FormFieldsEnum.token]}
                </div>
              )}
            </div>
          </div>
        </div>
        <div className='flex flex-col'>
          <label
            htmlFor={FormFieldsEnum.gasLimit}
            className='text-lg font-medium text-secondary transition-all duration-200 ease-out block mb-2'
          >
            Gas Limit:
          </label>
          <input
            className={classNames(
              'block w-full p-2 text-sm text-primary font-normal bg-secondary transition-all duration-300 rounded-xl placeholder-neutral-500 border border-secondary',
              {
                'border-red-600': gasLimitHasError
              }
            )}
            data-testid={DataTestIdsEnum.gasLimitInput}
            disabled={!isEgldToken}
            id={FormFieldsEnum.gasLimit}
            name={FormFieldsEnum.gasLimit}
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
            placeholder='Enter gas limit'
            type='number'
            value={formik.values[FormFieldsEnum.gasLimit]}
          />
          {gasLimitHasError && (
            <div
              className='text-red-600 text-sm mt-1'
              data-testid={DataTestIdsEnum.gasLimitError}
            >
              {formik.errors[FormFieldsEnum.gasLimit]}
            </div>
          )}
        </div>
        <div className='flex flex-col'>
          <label
            htmlFor={FormFieldsEnum.data}
            className='text-lg font-medium text-secondary transition-all duration-200 ease-out block mb-2'
          >
            Data:
          </label>
          <textarea
            className='block w-full p-2 text-sm text-primary font-normal bg-secondary transition-all duration-300 rounded-xl placeholder-neutral-500 border border-secondary'
            data-testid={DataTestIdsEnum.dataInput}
            disabled={!isEgldToken}
            id={FormFieldsEnum.data}
            name={FormFieldsEnum.data}
            onBlur={formik.handleBlur}
            onChange={handleOnDataChange}
            placeholder='Enter your data'
            value={formik.values[FormFieldsEnum.data]}
          />
        </div>
      </div>
      <div className='mt-4 flex flex-col items-center justify-center'>
        <Button
          className='mt-4 mx-auto rounded-lg bg-btn-primary text-btn-primary font-normal text-sm px-4 h-10 cursor-pointer hover:opacity-75'
          data-testid={DataTestIdsEnum.sendBtn}
          type='submit'
        >
          Send
        </Button>

        <MvxButton
          data-testid={DataTestIdsEnum.cancelBtn}
          onClick={handleCancel}
          variant='secondary'
        >
          Cancel
        </MvxButton>
      </div>
    </form>
  );
};
