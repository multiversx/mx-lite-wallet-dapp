import classNames from 'classnames';
import Select from 'react-select';
import { Button, MxLink } from 'components';
import { capitalize, getFormHasError } from 'helpers';
import {
  DataTestIdsEnum,
  DEVNET_CHAIN_ID,
  MAINNET_CHAIN_ID,
  TESTNET_CHAIN_ID
} from 'localConstants';
import { routeNames } from 'routes';
import { EnvironmentsEnum, SendTypeEnum } from 'types';
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

  return (
    <form onSubmit={formik.handleSubmit}>
      <div className='flex flex-col gap-4 h-full'>
        <div className='flex flex-col'>
          <label
            htmlFor={RegisterTokenFormFieldsEnum.contract}
            className='block text-sm font-bold mb-2'
          >
            Receiver:
          </label>
          <input
            className={classNames(
              'block w-full p-2 text-sm text-gray-700 placeholder-gray-400 border border-gray-300 rounded',
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
            className='block text-sm font-bold mb-2'
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
              <label htmlFor={SendTypeEnum.esdt} className='text-sm'>
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
              <label htmlFor={SendTypeEnum.nft} className='text-sm'>
                {SendTypeEnum.nft}
              </label>
            </div>
          </div>
        </div>
        <div className='flex flex-col'>
          <label
            htmlFor={RegisterTokenFormFieldsEnum.chainId}
            className='block text-sm font-bold mb-2'
          >
            Chain:
          </label>
          <div className='flex flex-col'>
            <Select
              className='text-sm text-gray-700 placeholder-gray-400'
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
            className='block text-sm font-bold mb-2'
          >
            Token:
          </label>
          <div className='flex flex-col'>
            <Select
              className='text-sm text-gray-700 placeholder-gray-400'
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
      <div className='mt-4 flex flex-col align-middle'>
        <Button
          className='mt-4 mx-auto rounded-lg bg-blue-600 px-4 py-2 text-white'
          data-testid={DataTestIdsEnum.sendBtn}
          type='submit'
        >
          Send
        </Button>
        <MxLink
          className='block w-full mt-2 px-4 py-2 text-sm text-center text-blue-600'
          data-testid={DataTestIdsEnum.cancelBtn}
          to={routeNames.dashboard}
        >
          Cancel
        </MxLink>
      </div>
    </form>
  );
};
