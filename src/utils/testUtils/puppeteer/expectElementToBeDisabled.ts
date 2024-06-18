import { getByDataTestId } from './getByDataTestId';

export const expectElementToBeDisabled = async ({
  dataTestId,
  isDisabled
}: {
  dataTestId: string;
  isDisabled: boolean;
}) => {
  const element = await page.waitForSelector(getByDataTestId(dataTestId));

  const isDisabledProperty = await (
    await element.getProperty('disabled')
  ).jsonValue();

  expect(isDisabledProperty).toEqual(isDisabled);
};
