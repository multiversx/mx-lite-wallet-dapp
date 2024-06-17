import { DEFAULT_DELAY_MS } from '__mocks__/data/constants';
import { getByDataTestId } from './getByDataTestId';
import { sleep } from './sleep';

export const uploadFile = async ({
  dataTestId,
  filePath,
  parent = page
}: {
  dataTestId: string;
  filePath: string;
  parent?: typeof page;
}) => {
  const uploadKeystoreElement = await parent.waitForSelector(
    getByDataTestId(dataTestId)
  );

  await uploadKeystoreElement?.uploadFile(filePath);
  await uploadKeystoreElement?.evaluate((upload) =>
    upload.dispatchEvent(new Event('change', { bubbles: true }))
  );

  await sleep(DEFAULT_DELAY_MS);
};
