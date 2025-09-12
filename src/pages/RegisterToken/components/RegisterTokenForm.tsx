import { MouseEvent } from 'react';
import { MvxButton } from '@multiversx/sdk-dapp-ui/react';
import classNames from 'classnames';
import { useNavigate } from 'react-router-dom';
import Select from 'react-select';
import { Button } from 'components';
import {
  DEVNET_CHAIN_ID,
  MAINNET_CHAIN_ID,
  TESTNET_CHAIN_ID,
  EnvironmentsEnum
} from 'lib';
import { DataTestIdsEnum, SELECT_CLASSNAMES } from 'localConstants';
import { routeNames } from 'routes';
import { SendTypeEnum } from 'types';
import { capitalize, getFormHasError } from 'utils';
import { useRegisterTokenForm } from '../hooks';
import { RegisterTokenFormFieldsEnum } from '../types';

export const RegisterTokenForm = () => {
  const {
    formik,
    handleOnSendTypeChange,
    handleChainChange,
    isLoading,
    isNFT,
    tokenOptions
  } = useRegisterTokenForm();

  const navigate = useNavigate();

  const chainOptions = [
    {
      label: capitalize(EnvironmentsEnum.devnet),
      value: DEVNET_CHAIN_ID
    },
    {
      label: capitalize(EnvironmentsEnum.testnet),
      value: TESTNET_CHAIN_ID
    },
    {
      label: capitalize(EnvironmentsEnum.mainnet),
      value: MAINNET_CHAIN_ID
    }
  ];

  const checkFormHasError = getFormHasError(formik);
  const hasContractError = checkFormHasError(
    RegisterTokenFormFieldsEnum.contract
  );

  const handleCancel = (event: MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    navigate(routeNames.dashboard);
  };

  return (
    <form onSubmit={formik.handleSubmit}>
      <div className='flex flex-col gap-4 h-full'>
        <div className='flex flex-col'>
          <label
            htmlFor={RegisterTokenFormFieldsEnum.contract}
            className='text-lg font-medium text-secondary transition-all duration-200 ease-out block mb-2'
          >
            Receiver:
          </label>
          <input
            className={classNames(
              'block w-full p-2 text-sm text-primary font-normal bg-secondary transition-all duration-300 rounded-xl placeholder-neutral-500 border border-secondary',
              {
                'border-red-600': hasContractError
              }
            )}
            data-testid={DataTestIdsEnum.contractInput}
            id={RegisterTokenFormFieldsEnum.contract}
            name={RegisterTokenFormFieldsEnum.contract}
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
            placeholder='Enter contract'
            value={formik.values[RegisterTokenFormFieldsEnum.contract]}
          />
          {hasContractError && (
            <div
              className='text-red-600 text-sm mt-1'
              data-testid={DataTestIdsEnum.contractError}
            >
              {formik.errors[RegisterTokenFormFieldsEnum.contract]}
            </div>
          )}
        </div>
        <div className='flex flex-col'>
          <label
            htmlFor={RegisterTokenFormFieldsEnum.type}
            className='text-lg font-medium text-secondary transition-all duration-200 ease-out block mb-2'
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
                name={RegisterTokenFormFieldsEnum.type}
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
                name={RegisterTokenFormFieldsEnum.type}
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
            htmlFor={RegisterTokenFormFieldsEnum.chainId}
            className='text-lg font-medium text-secondary transition-all duration-200 ease-out block mb-2'
          >
            Chain:
          </label>
          <div className='flex flex-col'>
            <Select
              classNames={SELECT_CLASSNAMES}
              options={chainOptions}
              name={RegisterTokenFormFieldsEnum.chainId}
              onChange={handleChainChange}
              onBlur={() =>
                formik.setFieldTouched(
                  RegisterTokenFormFieldsEnum.chainId,
                  true
                )
              }
              value={formik.values[RegisterTokenFormFieldsEnum.chainId]}
            />
          </div>
        </div>
        <div className='flex flex-col'>
          <label
            htmlFor={RegisterTokenFormFieldsEnum.token}
            className='text-lg font-medium text-secondary transition-all duration-200 ease-out block mb-2'
          >
            Token:
          </label>
          <div className='flex flex-col'>
            <Select
              classNames={SELECT_CLASSNAMES}
              isLoading={isLoading}
              options={tokenOptions}
              name={RegisterTokenFormFieldsEnum.token}
              onChange={(option) =>
                formik.setFieldValue(RegisterTokenFormFieldsEnum.token, option)
              }
              onBlur={() =>
                formik.setFieldTouched(RegisterTokenFormFieldsEnum.token, true)
              }
              value={formik.values[RegisterTokenFormFieldsEnum.token]}
            />
          </div>
        </div>
      </div>
      <div className='mt-4 flex flex-col items-center'>
        <Button
          className='mt-4 mx-auto rounded-lg bg-btn-primary text-btn-primary font-normal px-6 h-12 text-sm cursor-pointer hover:opacity-75'
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
