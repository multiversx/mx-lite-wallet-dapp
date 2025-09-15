import { MouseEvent } from 'react';
import { MvxButton } from '@multiversx/sdk-dapp-ui/react';
import classNames from 'classnames';
import { useNavigate } from 'react-router-dom';
import { Button } from 'components';
import { NftEnumType } from 'lib';
import { CollectionTypeByNftEnum, DataTestIdsEnum } from 'localConstants';
import { routeNames } from 'routes';
import { getFormHasError } from 'utils';
import { styles } from './issueCollection.styles';
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
      className={styles.issueCollectionContainer}
    >
      <div className={styles.issueCollectionFields}>
        <div className='flex flex-col'>
          <label
            htmlFor={IssueCollectionFieldsEnum.tokenType}
            className={styles.issueCollectionLabel}
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
              <label htmlFor={nft} className={styles.issueCollectionOption}>
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
              <label htmlFor={sft} className={styles.issueCollectionOption}>
                {sft}
              </label>
            </div>
          </div>
        </div>
        <div className='flex flex-col'>
          <label
            htmlFor={IssueCollectionFieldsEnum.tokenName}
            className={styles.issueCollectionLabel}
          >
            Collection name:
          </label>
          <input
            className={classNames(styles.issueCollectionInput, {
              'border-red-600': tokenNameHasError
            })}
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
              className={styles.issueCollectionTokenTickerError}
              data-testid={DataTestIdsEnum.tokenNameError}
            >
              {formik.errors[IssueCollectionFieldsEnum.tokenName]}
            </div>
          )}
        </div>
        <div className='flex flex-col'>
          <label
            htmlFor={IssueCollectionFieldsEnum.tokenTicker}
            className={styles.issueCollectionLabel}
          >
            Collection ticker:
          </label>

          <input
            className={classNames(styles.issueCollectionInput, {
              'border-red-600': tokenTickerHasError
            })}
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
              className={styles.issueCollectionTokenTickerError}
              data-testid={DataTestIdsEnum.tokenTickerError}
            >
              {formik.errors[IssueCollectionFieldsEnum.tokenTicker]}
            </div>
          )}
        </div>
      </div>

      <div className={styles.issueCollectionButtons}>
        <Button
          className={styles.issueCollectionSendButton}
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
          <span className='font-normal'>Cancel</span>
        </MvxButton>
      </div>
    </form>
  );
};
