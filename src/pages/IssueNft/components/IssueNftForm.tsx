import classNames from 'classnames';
import Select from 'react-select';
import { Button, MxLink } from 'components';
import { getFormHasError } from 'helpers';
import { DataTestIdsEnum } from 'localConstants';
import { routeNames } from 'routes';
import { NftEnumType } from 'types';
import { useIssueNftForm } from '../hooks';
import { IssueNftFieldsEnum } from '../types';

export const IssueNftForm = () => {
  const { formik, isLoading, collections, selectedCollection } =
    useIssueNftForm();

  const checkFormHasError = getFormHasError(formik);
  const nameHasError = checkFormHasError(IssueNftFieldsEnum.name);
  const quantityHasError = checkFormHasError(IssueNftFieldsEnum.quantity);
  const royaltiesHasError = checkFormHasError(IssueNftFieldsEnum.royalties);
  const imageUrlHasError = checkFormHasError(IssueNftFieldsEnum.imageUrl);
  const collectionHasError = checkFormHasError(IssueNftFieldsEnum.collection);

  return (
    <form
      onSubmit={formik.handleSubmit}
      noValidate
      className='d-flex flex-column'
    >
      <div className='flex flex-col gap-4 h-full'>
        <div className='flex flex-col'>
          <label
            htmlFor={IssueNftFieldsEnum.collection}
            className='block text-sm font-bold mb-2'
          >
            Collection:
          </label>
          <Select
            className='text-sm text-gray-700 placeholder-gray-400 w-full'
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
            className='block text-sm font-bold mb-2'
          >
            Name:
          </label>
          <input
            className={classNames(
              'block w-full p-2 text-sm text-gray-700 placeholder-gray-400 border border-gray-300 rounded',
              {
                'border-red-600': nameHasError
              }
            )}
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
            className='block text-sm font-bold mb-2'
          >
            Royalties:
          </label>
          <input
            className={classNames(
              'block w-full p-2 text-sm text-gray-700 placeholder-gray-400 border border-gray-300 rounded',
              {
                'border-red-600': royaltiesHasError
              }
            )}
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
            className='block text-sm font-bold mb-2'
          >
            Image URL:
          </label>
          <input
            className={classNames(
              'block w-full p-2 text-sm text-gray-700 placeholder-gray-400 border border-gray-300 rounded',
              {
                'border-red-600': imageUrlHasError
              }
            )}
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
      <div className='mt-4 flex flex-col align-middle'>
        <Button
          className='mt-4 mx-auto rounded-lg bg-blue-600 px-4 py-2 text-white'
          data-testid={DataTestIdsEnum.issueNftBtn}
          type='submit'
        >
          Create
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
