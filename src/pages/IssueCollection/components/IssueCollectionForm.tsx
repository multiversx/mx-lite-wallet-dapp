import { MouseEvent } from 'react';
import { MvxButton } from '@multiversx/sdk-dapp-ui/react';
import classNames from 'classnames';
import { useNavigate } from 'react-router-dom';
import { Button } from 'components';
import { NftEnumType } from 'lib';
import { CollectionTypeByNftEnum, DataTestIdsEnum } from 'localConstants';
import { routeNames } from 'routes';
import { getFormHasError } from 'utils';
import { useIssueCollectionForm } from '../hooks';
import { IssueCollectionFieldsEnum } from '../types';

export const IssueCollectionForm = () => {
  const formik = useIssueCollectionForm();
  const navigate = useNavigate();

  const nft =
    CollectionTypeByNftEnum[NftEnumType.NonFungibleESDT].toUpperCase();

  const sft =
    CollectionTypeByNftEnum[NftEnumType.SemiFungibleESDT].toUpperCase();

  const checkFormHasError = getFormHasError(formik);
  const tokenNameHasError = checkFormHasError(
    IssueCollectionFieldsEnum.tokenName
  );

  const tokenTickerHasError = checkFormHasError(
    IssueCollectionFieldsEnum.tokenTicker
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
            htmlFor={IssueCollectionFieldsEnum.tokenType}
            className='text-lg font-medium text-secondary transition-all duration-200 ease-out block mb-2'
          >
            Type:
          </label>
          <div className='flex flex-row gap-4'>
            <div>
              <input
                checked={
                  formik.values[IssueCollectionFieldsEnum.tokenType] === nft
                }
                className='mr-2'
                data-testid={DataTestIdsEnum.nftTypeInput}
                id={nft}
                name={IssueCollectionFieldsEnum.tokenType}
                onChange={formik.handleChange}
                type='radio'
                value={nft}
              />
              <label
                htmlFor={nft}
                className='text-sm font-medium text-primary transition-all duration-200 ease-out mb-2'
              >
                {nft}
              </label>
            </div>
            <div>
              <input
                checked={
                  formik.values[IssueCollectionFieldsEnum.tokenType] === sft
                }
                className='mr-2'
                data-testid={DataTestIdsEnum.sftTypeInput}
                id={sft}
                name={IssueCollectionFieldsEnum.tokenType}
                onChange={formik.handleChange}
                type='radio'
                value={sft}
              />
              <label
                htmlFor={sft}
                className='text-sm font-medium text-primary transition-all duration-200 ease-out mb-2'
              >
                {sft}
              </label>
            </div>
          </div>
        </div>
        <div className='flex flex-col'>
          <label
            htmlFor={IssueCollectionFieldsEnum.tokenName}
            className='text-lg font-medium text-secondary transition-all duration-200 ease-out block mb-2'
          >
            Collection name:
          </label>
          <input
            className={classNames(
              'block w-full p-2 text-sm text-primary font-normal bg-secondary transition-all duration-300 rounded-xl placeholder-neutral-500 border border-secondary',
              {
                'border-red-600': tokenNameHasError
              }
            )}
            data-testid={DataTestIdsEnum.tokenNameInput}
            id={IssueCollectionFieldsEnum.tokenName}
            name={IssueCollectionFieldsEnum.tokenName}
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
            placeholder='Enter token name'
            value={formik.values[IssueCollectionFieldsEnum.tokenName]}
          />
          {tokenNameHasError && (
            <div
              className='text-red-600 text-sm mt-1'
              data-testid={DataTestIdsEnum.tokenNameError}
            >
              {formik.errors[IssueCollectionFieldsEnum.tokenName]}
            </div>
          )}
        </div>
        <div className='flex flex-col'>
          <label
            htmlFor={IssueCollectionFieldsEnum.tokenTicker}
            className='text-lg font-medium text-secondary transition-all duration-200 ease-out block mb-2'
          >
            Collection ticker:
          </label>
          <input
            className={classNames(
              'block w-full p-2 text-sm text-primary font-normal bg-secondary transition-all duration-300 rounded-xl placeholder-neutral-500 border border-secondary',
              {
                'border-red-600': tokenTickerHasError
              }
            )}
            data-testid={DataTestIdsEnum.tokenTickerInput}
            id={IssueCollectionFieldsEnum.tokenTicker}
            name={IssueCollectionFieldsEnum.tokenTicker}
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
            placeholder='Enter token ticker'
            value={formik.values[IssueCollectionFieldsEnum.tokenTicker]}
          />
          {tokenTickerHasError && (
            <div
              className='text-red-600 text-sm mt-1'
              data-testid={DataTestIdsEnum.tokenTickerError}
            >
              {formik.errors[IssueCollectionFieldsEnum.tokenTicker]}
            </div>
          )}
        </div>
      </div>
      <div className='mt-4 flex flex-col items-center'>
        <Button
          className='mt-4 mx-auto rounded-lg bg-btn-primary text-btn-primary font-normal text-sm px-4 h-10 cursor-pointer hover:opacity-75'
          data-testid={DataTestIdsEnum.issueCollectionBtn}
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
