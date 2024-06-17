import { getByDataTestId } from './getByDataTestId';

export const expectInputToHaveValue = async ({
  dataTestId,
  value
}: {
  dataTestId: string;
  value: string;
}) => {
  const inputValue = await page.$eval(
    getByDataTestId(dataTestId),
    (input: any) => input.value
  );

  expect(inputValue).toEqual(value);
};
