import classNames from 'classnames';
import { Button, MxLink } from 'components';
import { getFormHasError } from 'helpers';
import { DataTestIdsEnum } from 'localConstants';

import { routeNames } from 'routes';
import { useIssueTokenForm } from '../hooks';
import { IssueTokenFieldsEnum } from '../types';

export const IssueTokenForm = () => {
  const formik = useIssueTokenForm();

  const checkFormHasError = getFormHasError(formik);
  const tokenNameHasError = checkFormHasError(IssueTokenFieldsEnum.tokenName);
  const tokenTickerHasError = checkFormHasError(
    IssueTokenFieldsEnum.tokenTicker
  );

  const mintedValueHasError = checkFormHasError(
    IssueTokenFieldsEnum.mintedValue
  );

  const numDecimalsHasError = checkFormHasError(
    IssueTokenFieldsEnum.numDecimals
  );

  return (
    <form
      onSubmit={formik.handleSubmit}
      noValidate
      className='d-flex flex-column'
    >
      <div className='flex flex-col gap-4 h-full'>
        <div className='flex flex-col'>
          <label
            htmlFor={IssueTokenFieldsEnum.tokenName}
            className='block text-sm font-bold mb-2'
          >
            Token name:
          </label>
          <input
            className={classNames(
              'block w-full p-2 text-sm text-gray-700 placeholder-gray-400 border border-gray-300 rounded',
              {
                'border-red-600': tokenNameHasError
              }
            )}
            data-testid={DataTestIdsEnum.tokenNameInput}
            id={IssueTokenFieldsEnum.tokenName}
            name={IssueTokenFieldsEnum.tokenName}
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
            placeholder='Enter token name'
            value={formik.values[IssueTokenFieldsEnum.tokenName]}
          />
          {tokenNameHasError && (
            <div
              className='text-red-600 text-sm mt-1'
              data-testid={DataTestIdsEnum.tokenNameError}
            >
              {formik.errors[IssueTokenFieldsEnum.tokenName]}
            </div>
          )}
        </div>
        <div className='flex flex-col'>
          <label
            htmlFor={IssueTokenFieldsEnum.tokenTicker}
            className='block text-sm font-bold mb-2'
          >
            Token ticker:
          </label>
          <input
            className={classNames(
              'block w-full p-2 text-sm text-gray-700 placeholder-gray-400 border border-gray-300 rounded',
              {
                'border-red-600': tokenTickerHasError
              }
            )}
            data-testid={DataTestIdsEnum.tokenTickerInput}
            id={IssueTokenFieldsEnum.tokenTicker}
            name={IssueTokenFieldsEnum.tokenTicker}
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
            placeholder='Enter token ticker'
            value={formik.values[IssueTokenFieldsEnum.tokenTicker]}
          />
          {tokenTickerHasError && (
            <div
              className='text-red-600 text-sm mt-1'
              data-testid={DataTestIdsEnum.tokenTickerError}
            >
              {formik.errors[IssueTokenFieldsEnum.tokenTicker]}
            </div>
          )}
        </div>
        <div className='flex flex-col'>
          <label
            htmlFor={IssueTokenFieldsEnum.mintedValue}
            className='block text-sm font-bold mb-2'
          >
            Mint amount:
          </label>
          <input
            className={classNames(
              'block w-full p-2 text-sm text-gray-700 placeholder-gray-400 border border-gray-300 rounded',
              {
                'border-red-600': mintedValueHasError
              }
            )}
            data-testid={DataTestIdsEnum.mintedValueInput}
            id={IssueTokenFieldsEnum.mintedValue}
            name={IssueTokenFieldsEnum.mintedValue}
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
            placeholder='Enter minted amount'
            type='number'
            value={formik.values[IssueTokenFieldsEnum.mintedValue]}
          />
          {mintedValueHasError && (
            <div
              className='text-red-600 text-sm mt-1'
              data-testid={DataTestIdsEnum.mintedValueError}
            >
              {formik.errors[IssueTokenFieldsEnum.mintedValue]}
            </div>
          )}
        </div>
        <div className='flex flex-col'>
          <label
            htmlFor={IssueTokenFieldsEnum.numDecimals}
            className='block text-sm font-bold mb-2'
          >
            Token decimals:
          </label>
          <input
            className={classNames(
              'block w-full p-2 text-sm text-gray-700 placeholder-gray-400 border border-gray-300 rounded',
              {
                'border-red-600': numDecimalsHasError
              }
            )}
            data-testid={DataTestIdsEnum.numDecimalsInput}
            id={IssueTokenFieldsEnum.numDecimals}
            name={IssueTokenFieldsEnum.numDecimals}
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
            placeholder='Enter token decimals'
            type='number'
            value={formik.values[IssueTokenFieldsEnum.numDecimals]}
          />
          {numDecimalsHasError && (
            <div
              className='text-red-600 text-sm mt-1'
              data-testid={DataTestIdsEnum.numDecimalsError}
            >
              {formik.errors[IssueTokenFieldsEnum.numDecimals]}
            </div>
          )}
        </div>
      </div>
      <div className='mt-4 flex flex-col align-middle'>
        <Button
          className='mt-4 mx-auto rounded-lg bg-blue-600 px-4 py-2 text-white'
          data-testid={DataTestIdsEnum.issueTokenBtn}
          type='submit'
        >
          Issue
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
