import { MouseEvent } from 'react';
import { MvxButton } from '@multiversx/sdk-dapp-ui/react';
import classNames from 'classnames';
import { useNavigate } from 'react-router-dom';
import Select from 'react-select';
import { Button } from 'components';
import { NftEnumType } from 'lib';
import { DataTestIdsEnum, SELECT_CLASSNAMES } from 'localConstants';
import { routeNames } from 'routes';
import { getFormHasError } from 'utils';
import { useIssueNftForm } from '../hooks';
import { IssueNftFieldsEnum } from '../types';

// prettier-ignore
export const styles = {
  issueNftFormContainer: 'd-flex flex-column',
  issueNftFormLabel: 'issue-nft-form-label text-lg font-medium text-secondary transition-all duration-200 ease-out block mb-2',
  createButton: 'create-button mt-4 mx-auto rounded-lg bg-btn-primary text-btn-primary font-normal px-6 h-12 text-sm cursor-pointer hover:opacity-75',
  issueNftFormInput: 'issue-nft-form-input block w-full p-2 text-sm text-primary font-normal bg-secondary transition-all duration-300 rounded-xl placeholder-neutral-500 border border-secondary'
} satisfies Record<string, string>;

export const IssueNftForm = () => {
  const { formik, isLoading, collections, selectedCollection } =
    useIssueNftForm();

  const navigate = useNavigate();

  const checkFormHasError = getFormHasError(formik);
  const nameHasError = checkFormHasError(IssueNftFieldsEnum.name);
  const quantityHasError = checkFormHasError(IssueNftFieldsEnum.quantity);
  const royaltiesHasError = checkFormHasError(IssueNftFieldsEnum.royalties);
  const imageUrlHasError = checkFormHasError(IssueNftFieldsEnum.imageUrl);
  const collectionHasError = checkFormHasError(IssueNftFieldsEnum.collection);

  const handleCancel = (event: MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    navigate(routeNames.dashboard);
  };

  return (
    <form
      onSubmit={formik.handleSubmit}
      noValidate
      className={styles.issueNftFormContainer}
    >
      <div className='flex flex-col gap-4 h-full'>
        <div className='flex flex-col'>
          <label
            htmlFor={IssueNftFieldsEnum.collection}
            className={styles.issueNftFormLabel}
          >
            Collection:
          </label>
          <Select
            classNames={SELECT_CLASSNAMES}
            id={IssueNftFieldsEnum.collection}
            isLoading={isLoading}
            options={collections}
            name={IssueNftFieldsEnum.collection}
            onChange={(option) =>
              formik.setFieldValue(IssueNftFieldsEnum.collection, option)
            }
            onBlur={() =>
              formik.setFieldTouched(IssueNftFieldsEnum.collection, true)
            }
            value={formik.values[IssueNftFieldsEnum.collection]}
          />
          {collectionHasError && (
            <div
              className='text-red-600 text-sm mt-1'
              data-testid={DataTestIdsEnum.collectionError}
            >
              {String(formik.errors[IssueNftFieldsEnum.collection])}
            </div>
          )}
        </div>
        <div className='flex flex-col'>
          <label
            htmlFor={IssueNftFieldsEnum.name}
            className={styles.issueNftFormLabel}
          >
            Name:
          </label>

          <input
            className={classNames(styles.issueNftFormInput, {
              'border-red-600': nameHasError
            })}
            data-testid={DataTestIdsEnum.nameInput}
            id={IssueNftFieldsEnum.name}
            name={IssueNftFieldsEnum.name}
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
            placeholder='Enter name'
            value={formik.values[IssueNftFieldsEnum.name]}
          />
          {nameHasError && (
            <div
              className='text-red-600 text-sm mt-1'
              data-testid={DataTestIdsEnum.nameError}
            >
              {formik.errors[IssueNftFieldsEnum.name]}
            </div>
          )}
        </div>
        {selectedCollection?.type === NftEnumType.SemiFungibleESDT && (
          <div className='flex flex-col'>
            <label
              htmlFor={IssueNftFieldsEnum.quantity}
              className='block text-sm font-bold mb-2'
            >
              Quantity:
            </label>
            <input
              className={classNames(
                'block w-full p-2 text-sm text-gray-700 placeholder-gray-400 border border-gray-300 rounded',
                {
                  'border-red-600': quantityHasError
                }
              )}
              data-testid={DataTestIdsEnum.quantityInput}
              id={IssueNftFieldsEnum.quantity}
              name={IssueNftFieldsEnum.quantity}
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              placeholder='Enter quantity'
              type='number'
              value={formik.values[IssueNftFieldsEnum.quantity]}
            />
            {quantityHasError && (
              <div
                className='text-red-600 text-sm mt-1'
                data-testid={DataTestIdsEnum.quantityError}
              >
                {formik.errors[IssueNftFieldsEnum.quantity]}
              </div>
            )}
          </div>
        )}
        <div className='flex flex-col'>
          <label
            htmlFor={IssueNftFieldsEnum.royalties}
            className={styles.issueNftFormLabel}
          >
            Royalties:
          </label>

          <input
            className={classNames(styles.issueNftFormInput, {
              'border-red-600': royaltiesHasError
            })}
            data-testid={DataTestIdsEnum.royaltiesInput}
            id={IssueNftFieldsEnum.royalties}
            name={IssueNftFieldsEnum.royalties}
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
            placeholder='Enter royalties'
            type='number'
            value={formik.values[IssueNftFieldsEnum.royalties]}
          />
          {royaltiesHasError && (
            <div
              className='text-red-600 text-sm mt-1'
              data-testid={DataTestIdsEnum.royaltiesError}
            >
              {formik.errors[IssueNftFieldsEnum.royalties]}
            </div>
          )}
        </div>
        <div className='flex flex-col'>
          <label
            htmlFor={IssueNftFieldsEnum.imageUrl}
            className={styles.issueNftFormLabel}
          >
            Image URL:
          </label>
          <input
            className={classNames(styles.issueNftFormInput, {
              'border-red-600': imageUrlHasError
            })}
            data-testid={DataTestIdsEnum.imageUrlInput}
            id={IssueNftFieldsEnum.imageUrl}
            name={IssueNftFieldsEnum.imageUrl}
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
            placeholder='Enter image URL'
            value={formik.values[IssueNftFieldsEnum.imageUrl]}
          />
          {collectionHasError && (
            <div
              className='text-red-600 text-sm mt-1'
              data-testid={DataTestIdsEnum.imageUrlError}
            >
              {formik.errors[IssueNftFieldsEnum.imageUrl]}
            </div>
          )}
        </div>
      </div>
      <div className='mt-4 flex flex-col items-center'>
        <Button
          className={styles.createButton}
          data-testid={DataTestIdsEnum.issueNftBtn}
          type='submit'
        >
          Create
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
