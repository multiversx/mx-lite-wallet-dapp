import { DEFAULT_DELAY_MS } from '__mocks__/data/constants';
import { getByTestIdDeep } from './getByDataTestIdDeep';
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
  const uploadKeystoreElement = await getByTestIdDeep(parent, dataTestId);
  await uploadKeystoreElement?.uploadFile(filePath);
  await uploadKeystoreElement?.evaluate((upload: any) =>
    upload.dispatchEvent(new Event('change', { bubbles: true }))
  );

  await sleep(DEFAULT_DELAY_MS);
};
