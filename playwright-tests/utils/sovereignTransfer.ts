import { Page } from '@playwright/test';
import { DataTestIdsEnum } from '../../src/localConstants/dataTestIds.enum';
import { AccountStatesEnum, GlobalDataEnum } from '../utils/enums.ts';

type SovereignTransferType = {
  page: Page;
  contractInput?: string;
  receiver?: string;
};
export const sovereignTransfer = async ({
  page,
  contractInput = GlobalDataEnum.contractDevnet,
  receiver = AccountStatesEnum.unGuardAccount8
}: SovereignTransferType) => {
  await page.getByTestId(DataTestIdsEnum.contractInput).fill(contractInput);
  await page.getByTestId(DataTestIdsEnum.receiverInput).fill(receiver);
  await page.getByTestId(DataTestIdsEnum.sendBtn).click();
};
