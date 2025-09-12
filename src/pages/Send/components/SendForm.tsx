import { MouseEvent } from 'react';
import { MvxButton } from '@multiversx/sdk-dapp-ui/react';
import classNames from 'classnames';
import { useNavigate } from 'react-router-dom';
import Select from 'react-select';
import { Button } from 'components';
import { DataTestIdsEnum, SELECT_CLASSNAMES } from 'localConstants';
import { routeNames } from 'routes';
import { SendTypeEnum } from 'types';
import { getFormHasError } from 'utils';
import { useSendForm } from '../hooks';
import { FormFieldsEnum } from '../types';

// prettier-ignore
const styles = {
  sendInput: 'send-input block w-full p-2 text-sm text-primary font-normal bg-secondary transition-all duration-300 rounded-xl placeholder-neutral-500 border border-secondary',
  sendInputError: 'send-input-error text-red-600 text-sm mt-1',
  sendLabel: 'send-label text-lg font-medium text-secondary transition-all duration-200 ease-out block mb-2',
  sendTypeOption: 'send-type-option text-sm text-primary font-normal bg-secondary transition-all duration-300',
  sendButton: 'send-button mt-4 mx-auto rounded-lg bg-btn-primary text-btn-primary font-normal text-sm px-6 h-12 cursor-pointer hover:opacity-75'
} satisfies Record<string, string>;

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
          <label htmlFor={FormFieldsEnum.receiver} className={styles.sendLabel}>
            Receiver:
          </label>
          <input
            className={classNames(styles.sendInput, {
              'border-red-600': receiverHasError
            })}
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
              className={styles.sendInputError}
              data-testid={DataTestIdsEnum.receiverError}
            >
              {formik.errors[FormFieldsEnum.receiver]}
            </div>
          )}
        </div>
        <div className='flex flex-col'>
          <label htmlFor={FormFieldsEnum.type} className={styles.sendLabel}>
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
                className={styles.sendTypeOption}
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
                className={styles.sendTypeOption}
              >
                {SendTypeEnum.nft}
              </label>
            </div>
          </div>
        </div>
        <div className='flex flex-col'>
          <label htmlFor={FormFieldsEnum.amount} className={styles.sendLabel}>
            Amount:
          </label>
          <div className='flex flex-row gap-2'>
            <div className='flex flex-col w-full'>
              <input
                className={classNames(styles.sendInput, {
                  'border-red-600': amountHasError
                })}
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
                  className={styles.sendInputError}
                  data-testid={DataTestIdsEnum.amountError}
                >
                  {formik.errors[FormFieldsEnum.amount]}
                </div>
              )}
            </div>
            <div className='flex flex-col w-1/2'>
              <Select
                classNames={SELECT_CLASSNAMES}
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
                  className={styles.sendInputError}
                  data-testid={DataTestIdsEnum.tokenError}
                >
                  {formik.errors[FormFieldsEnum.token]}
                </div>
              )}
            </div>
          </div>
        </div>
        <div className='flex flex-col'>
          <label htmlFor={FormFieldsEnum.gasLimit} className={styles.sendLabel}>
            Gas Limit:
          </label>
          <input
            className={classNames(styles.sendInput, {
              'border-red-600': gasLimitHasError
            })}
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
              className={styles.sendInputError}
              data-testid={DataTestIdsEnum.gasLimitError}
            >
              {formik.errors[FormFieldsEnum.gasLimit]}
            </div>
          )}
        </div>
        <div className='flex flex-col'>
          <label htmlFor={FormFieldsEnum.data} className={styles.sendLabel}>
            Data:
          </label>
          <textarea
            className={styles.sendInput}
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
          className={styles.sendButton}
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
          <span className='font-normal'>Cancel</span>
        </MvxButton>
      </div>
    </form>
  );
};
