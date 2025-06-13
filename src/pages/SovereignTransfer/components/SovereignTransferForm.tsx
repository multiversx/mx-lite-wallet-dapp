import { ChangeEventHandler } from 'react';
import classNames from 'classnames';
import Select from 'react-select';
import { Button, MxLink } from 'components';
import { getFormHasError } from 'helpers';
import { DataTestIdsEnum } from 'localConstants';
import { routeNames } from 'routes';
import { SendTypeEnum } from 'types';
import { useSovereignTransferForm } from '../hooks';
import {
  SovereignTransferFormFieldsEnum,
  SovereignTransferTokenType
} from '../types';

export const SovereignTransferForm = () => {
  const {
    formik,
    getCanEditNftAmount,
    getIsNFT,
    getTokenAvailableAmount,
    getTokenOptionsByType,
    handleAddToken,
    handleRemoveToken,
    isLoading
  } = useSovereignTransferForm();

  const checkFormHasError = getFormHasError(formik);
  const contractHasError = checkFormHasError(
    SovereignTransferFormFieldsEnum.contract
  );

  return (
    <form onSubmit={formik.handleSubmit}>
      <div className='flex flex-col gap-4 h-full'>
        <div className='flex flex-col'>
          <label
            htmlFor={SovereignTransferFormFieldsEnum.contract}
            className='block text-sm font-bold mb-2'
          >
            Contract:
          </label>
          <input
            className={classNames(
              'block w-full p-2 text-sm text-gray-700 placeholder-gray-400 border border-gray-300 rounded',
              {
                'border-red-600': contractHasError
              }
            )}
            data-testid={DataTestIdsEnum.contractInput}
            id={SovereignTransferFormFieldsEnum.contract}
            name={SovereignTransferFormFieldsEnum.contract}
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
            placeholder='Enter contract'
            value={formik.values[SovereignTransferFormFieldsEnum.contract]}
          />
          {contractHasError && (
            <div
              className='text-red-600 text-sm mt-1'
              data-testid={DataTestIdsEnum.contractError}
            >
              {formik.errors[SovereignTransferFormFieldsEnum.contract]}
            </div>
          )}
        </div>
        <div className='flex flex-col'>
          <label
            htmlFor={SovereignTransferFormFieldsEnum.receiver}
            className='block text-sm font-bold mb-2'
          >
            Receiver:
          </label>
          <input
            className={classNames(
              'block w-full p-2 text-sm text-gray-700 placeholder-gray-400 border border-gray-300 rounded',
              {
                'border-red-600': checkFormHasError(
                  SovereignTransferFormFieldsEnum.receiver
                )
              }
            )}
            data-testid={DataTestIdsEnum.receiverInput}
            id={SovereignTransferFormFieldsEnum.receiver}
            name={SovereignTransferFormFieldsEnum.receiver}
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
            placeholder='Enter receiver'
            value={formik.values[SovereignTransferFormFieldsEnum.receiver]}
          />
          {contractHasError && (
            <div
              className='text-red-600 text-sm mt-1'
              data-testid={DataTestIdsEnum.receiverError}
            >
              {formik.errors[SovereignTransferFormFieldsEnum.receiver]}
            </div>
          )}
        </div>
        {formik.values[SovereignTransferFormFieldsEnum.tokens].map(
          (token, index, array) => {
            const typeFieldName = `${SovereignTransferFormFieldsEnum.tokens}[${index}].${SovereignTransferFormFieldsEnum.type}`;
            const amountFieldName = `${SovereignTransferFormFieldsEnum.tokens}[${index}].${SovereignTransferFormFieldsEnum.amount}`;
            const tokenFieldName = `${SovereignTransferFormFieldsEnum.tokens}[${index}].${SovereignTransferFormFieldsEnum.token}`;

            const isNFT = getIsNFT(token[SovereignTransferFormFieldsEnum.type]);
            const tokenTouched =
              formik.touched[SovereignTransferFormFieldsEnum.tokens]?.[index];

            const tokenError = formik.errors[
              SovereignTransferFormFieldsEnum.tokens
            ]?.[index] as unknown as SovereignTransferTokenType;

            const availableAmount = getTokenAvailableAmount({
              sendType: token[SovereignTransferFormFieldsEnum.type],
              token: token[SovereignTransferFormFieldsEnum.token]?.value
            });

            const canEditNftAmount = getCanEditNftAmount(availableAmount);

            const tokenOptions = getTokenOptionsByType(
              token[SovereignTransferFormFieldsEnum.type]
            );

            const setDefaultAmount = ({
              selectedType,
              skipTokenReset
            }: {
              selectedType: SendTypeEnum;
              skipTokenReset?: boolean;
            }) => {
              const options = getTokenOptionsByType(selectedType);

              if (options.length > 0) {
                const defaultOption = options[0];

                if (!skipTokenReset) {
                  formik.setFieldValue(tokenFieldName, defaultOption);
                }

                const amount = getTokenAvailableAmount({
                  sendType: selectedType,
                  token: defaultOption.value
                });

                formik.setFieldValue(
                  amountFieldName,
                  amount === '0' || !getIsNFT(selectedType) ? 0 : 1
                );
              }
            };

            const handleOnSendTypeChange: (
              sendType: SendTypeEnum
            ) => ChangeEventHandler<HTMLInputElement> =
              (selectedType: SendTypeEnum) => (event) => {
                formik.setFieldValue(typeFieldName, selectedType);
                setDefaultAmount({ selectedType });

                return formik.handleChange(event);
              };

            const hasAmountError = tokenTouched?.amount && tokenError?.amount;

            return (
              <div className='flex flex-col' key={index}>
                <div className='flex flex-col'>
                  <label
                    htmlFor={SovereignTransferFormFieldsEnum.type}
                    className='block text-sm font-bold mb-2'
                  >
                    Type:
                  </label>
                  <div className='flex flex-row gap-4'>
                    <div>
                      <input
                        checked={!isNFT}
                        className='mr-2'
                        data-testid={`${DataTestIdsEnum.sendEsdtTypeInput}${index}`}
                        id={`${SendTypeEnum.esdt}${index}`}
                        name={typeFieldName}
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
                        data-testid={`${DataTestIdsEnum.sendNFtTypeInput}${index}`}
                        id={`${SendTypeEnum.nft}${index}`}
                        name={typeFieldName}
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
                    htmlFor={amountFieldName}
                    className='block text-sm font-bold mb-2'
                  >
                    Amount:
                  </label>
                  <div className='flex flex-row gap-2'>
                    <div className='flex flex-col w-full'>
                      <input
                        className={classNames(
                          'block w-full p-2 text-sm text-gray-700 placeholder-gray-400 border border-gray-300 rounded',
                          {
                            'border-red-600': hasAmountError
                          }
                        )}
                        disabled={isNFT && !canEditNftAmount}
                        data-testid={`${DataTestIdsEnum.amountInput}${index}`}
                        id={amountFieldName}
                        name={amountFieldName}
                        onBlur={formik.handleBlur}
                        onChange={formik.handleChange}
                        placeholder='Enter amount'
                        type='number'
                        value={token[SovereignTransferFormFieldsEnum.amount]}
                      />
                      {!hasAmountError && (
                        <div
                          className='text-sm text-gray-400 mt-1'
                          data-testid={`${DataTestIdsEnum.availableAmount}${index}`}
                        >
                          Available: {availableAmount}{' '}
                          {token[SovereignTransferFormFieldsEnum.token]?.label}
                        </div>
                      )}
                      {hasAmountError && (
                        <div
                          className='text-red-600 text-sm mt-1'
                          data-testid={`${DataTestIdsEnum.amountError}${index}`}
                        >
                          {tokenError?.amount}
                        </div>
                      )}
                    </div>
                    <div className='flex flex-col w-1/2'>
                      <Select
                        className='text-sm text-gray-700 placeholder-gray-400'
                        isLoading={isLoading}
                        options={tokenOptions}
                        name={tokenFieldName}
                        onChange={(option) => {
                          formik.setFieldValue(tokenFieldName, option);
                          setDefaultAmount({
                            selectedType: token[
                              SovereignTransferFormFieldsEnum.type
                            ] as SendTypeEnum,
                            skipTokenReset: true
                          });
                        }}
                        onBlur={() =>
                          formik.setFieldTouched(tokenFieldName, true)
                        }
                        value={token[SovereignTransferFormFieldsEnum.token]}
                      />
                      {tokenTouched?.[SovereignTransferFormFieldsEnum.token] &&
                        tokenError?.[SovereignTransferFormFieldsEnum.token] && (
                          <div
                            className='text-red-600 text-sm mt-1'
                            data-testid={`${DataTestIdsEnum.tokenError}${index}`}
                          >
                            {
                              tokenError[
                                SovereignTransferFormFieldsEnum.token
                              ] as unknown as string
                            }
                          </div>
                        )}
                    </div>
                  </div>
                </div>
                <div className='flex flex-row gap-2'>
                  {index === array.length - 1 && (
                    <Button
                      className='mt-4 rounded-lg bg-blue-600 px-4 py-2 text-white'
                      data-testid={DataTestIdsEnum.addTokenBtn}
                      onClick={handleAddToken}
                    >
                      Add token
                    </Button>
                  )}
                  {index > 0 && (
                    <Button
                      className='mt-4 rounded-lg bg-red-600 px-4 py-2 text-white'
                      data-testid={`${DataTestIdsEnum.removeTokenBtn}${index}`}
                      onClick={handleRemoveToken(index)}
                    >
                      Remove token
                    </Button>
                  )}
                </div>
              </div>
            );
          }
        )}
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
