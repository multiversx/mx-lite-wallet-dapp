import classNames from 'classnames';
import { Button, MxLink } from 'components';
import { getFormHasError } from 'helpers';
import { CollectionTypeByNftEnum, DataTestIdsEnum } from 'localConstants';
import { routeNames } from 'routes';
import { NftEnumType } from 'types';
import { useIssueCollectionForm } from '../hooks';
import { IssueCollectionFieldsEnum } from '../types';

export const IssueCollectionForm = () => {
  const formik = useIssueCollectionForm();
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
            className='block text-sm font-bold mb-2'
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
                defaultChecked
                id={nft}
                name={IssueCollectionFieldsEnum.tokenType}
                onChange={formik.handleChange}
                type='radio'
                value={nft}
              />
              <label htmlFor={nft} className='text-sm'>
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
              <label htmlFor={sft} className='text-sm'>
                {sft}
              </label>
            </div>
          </div>
        </div>
        <div className='flex flex-col'>
          <label
            htmlFor={IssueCollectionFieldsEnum.tokenName}
            className='block text-sm font-bold mb-2'
          >
            Collection name:
          </label>
          <input
            className={classNames(
              'block w-full p-2 text-sm text-gray-700 placeholder-gray-400 border border-gray-300 rounded',
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
            className='block text-sm font-bold mb-2'
          >
            Collection ticker:
          </label>
          <input
            className={classNames(
              'block w-full p-2 text-sm text-gray-700 placeholder-gray-400 border border-gray-300 rounded',
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
      <div className='mt-4 flex flex-col align-middle'>
        <Button
          className='mt-4 mx-auto rounded-lg bg-blue-600 px-4 py-2 text-white'
          data-testid={DataTestIdsEnum.issueCollectionBtn}
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
