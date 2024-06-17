import { getByDataTestId } from './getByDataTestId';

export const expectToBeChecked = async ({
  dataTestId,
  isChecked,
  parent = page
}: {
  dataTestId: string;
  isChecked: boolean;
  parent?: typeof page;
}) => {
  const radioElement = await parent.waitForSelector(
    getByDataTestId(dataTestId)
  );

  const isCheckBoxChecked = await (
    await radioElement.getProperty('checked')
  ).jsonValue();

  expect(isCheckBoxChecked).toEqual(isChecked);
};
