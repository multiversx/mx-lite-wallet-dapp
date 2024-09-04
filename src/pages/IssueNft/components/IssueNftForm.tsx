import { NftEnumType } from '@multiversx/sdk-dapp/types/tokens.types';
import classNames from 'classnames';
import Select from 'react-select';
import { Button, MxLink } from 'components';
import { DataTestIdsEnum } from 'localConstants';
import { routeNames } from 'routes';
import { useIssueNftForm } from '../hooks';
import { IssueNftFieldsEnum } from '../types';

export const IssueNftForm = () => {
  const { formik, isLoading, collections, selectedCollection } =
    useIssueNftForm();

  return (
    <form
      onSubmit={formik.handleSubmit}
      noValidate
      className='d-flex flex-column'
    >
      <div className='flex flex-col gap-4 h-full'>
        <div className='flex flex-row align-middle w-full'>
          <div className='flex flex-col w-full'>
            <Select
              className='text-sm text-gray-700 placeholder-gray-400 w-full'
              isLoading={isLoading}
              options={collections as any}
              name={IssueNftFieldsEnum.collection}
              onChange={(option) =>
                formik.setFieldValue(IssueNftFieldsEnum.collection, option)
              }
              onBlur={() =>
                formik.setFieldTouched(IssueNftFieldsEnum.collection, true)
              }
              value={formik.values[IssueNftFieldsEnum.collection]}
            />
            {formik.touched[IssueNftFieldsEnum.collection] &&
              formik.errors[IssueNftFieldsEnum.collection] && (
                <div
                  className='text-red-600 text-sm mt-1'
                  data-testid={DataTestIdsEnum.collectionError}
                >
                  {formik.errors[IssueNftFieldsEnum.collection] as any}
                </div>
              )}
          </div>
          <div className='w-1/3'>
            <MxLink to={routeNames.issueCollection}>Issue collection</MxLink>
          </div>
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
                'border-red-600':
                  formik.touched[IssueNftFieldsEnum.name] &&
                  formik.errors[IssueNftFieldsEnum.name]
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
          {formik.touched[IssueNftFieldsEnum.name] &&
            formik.errors[IssueNftFieldsEnum.name] && (
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
                  'border-red-600':
                    formik.touched[IssueNftFieldsEnum.quantity] &&
                    formik.errors[IssueNftFieldsEnum.quantity]
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
            {formik.touched[IssueNftFieldsEnum.quantity] &&
              formik.errors[IssueNftFieldsEnum.quantity] && (
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
                'border-red-600':
                  formik.touched[IssueNftFieldsEnum.royalties] &&
                  formik.errors[IssueNftFieldsEnum.royalties]
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
          {formik.touched[IssueNftFieldsEnum.royalties] &&
            formik.errors[IssueNftFieldsEnum.royalties] && (
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
                'border-red-600':
                  formik.touched[IssueNftFieldsEnum.imageUrl] &&
                  formik.errors[IssueNftFieldsEnum.imageUrl]
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
          {formik.touched[IssueNftFieldsEnum.imageUrl] &&
            formik.errors[IssueNftFieldsEnum.imageUrl] && (
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
