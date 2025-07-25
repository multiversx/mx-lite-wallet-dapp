import { DataTestIdsEnum } from 'localConstants/dataTestIds.enum';
import { getByTestIdDeep } from './getByDataTestIdDeep';

/**
 * TODO: Implement this
 */
export const expectAndSignTransaction = async () => {
  // Wait for the PEM login panel to appear
  const sidePanel = await getByTestIdDeep(page, DataTestIdsEnum.sidePanel);

  expect(sidePanel).toBeDefined();
};
