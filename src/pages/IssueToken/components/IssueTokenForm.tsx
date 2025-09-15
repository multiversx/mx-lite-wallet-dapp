import { MouseEvent } from 'react';
import { MvxButton } from '@multiversx/sdk-dapp-ui/react';
import classNames from 'classnames';
import { useNavigate } from 'react-router-dom';
import { Button } from 'components';
import { DataTestIdsEnum } from 'localConstants';

import { routeNames } from 'routes';
import { getFormHasError } from 'utils';
import { useIssueTokenForm } from '../hooks';
import { IssueTokenFieldsEnum } from '../types';

// prettier-ignore
export const styles = {
  issueTokenLabel: 'issue-token-label text-lg font-medium text-secondary transition-all duration-200 ease-out block mb-2',
  issueTokenInput: 'issue-token-input block w-full p-2 text-sm text-primary font-normal bg-secondary transition-all duration-200 rounded-xl placeholder-neutral-500 border border-secondary',
  issueButton: 'mt-4 mx-auto rounded-lg bg-btn-primary text-btn-primary font-normal px-6 h-12 cursor-pointer hover:opacity-75'

} satisfies Record<string, string>;

export const IssueTokenForm = () => {
  const formik = useIssueTokenForm();
  const navigate = useNavigate();

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

  const handleCancel = (event: MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    navigate(routeNames.dashboard);
  };

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
            className={styles.issueTokenLabel}
          >
            Token name:
          </label>
          <input
            className={classNames(styles.issueTokenInput, {
              'border-red-600': tokenNameHasError
            })}
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
            className={styles.issueTokenLabel}
          >
            Token ticker:
          </label>
          <input
            className={classNames(styles.issueTokenInput, {
              'border-red-600': tokenTickerHasError
            })}
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
            className={styles.issueTokenLabel}
          >
            Mint amount:
          </label>

          <input
            className={classNames(styles.issueTokenInput, {
              'border-red-600': mintedValueHasError
            })}
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
            className={styles.issueTokenLabel}
          >
            Token decimals:
          </label>
          <input
            className={classNames(styles.issueTokenInput, {
              'border-red-600': numDecimalsHasError
            })}
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
      <div className='mt-4 flex flex-col items-center'>
        <Button
          className={styles.issueButton}
          data-testid={DataTestIdsEnum.issueTokenBtn}
          type='submit'
        >
          Issue
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
