import {
  DEFAULT_PAGE_LOAD_DELAY_MS,
  WALLET_SOURCE_ORIGIN
} from '__mocks__/data';
import { sleep } from 'utils/testUtils/puppeteer';

const CREATE_MNEMONICS_ROUTE = '/create/mnemonic';
const CHECK_MNEMONICS_ROUTE = '/create/check';
const SET_PASSWORD_ROUTE = '/create/password';
const DOWNLOAD_ROUTE = '/create/download';

describe('Create flow navigation', () => {
  it(`should navigate to create page when navigating to ${CREATE_MNEMONICS_ROUTE}`, async () => {
    await page.goto(`${WALLET_SOURCE_ORIGIN}${CREATE_MNEMONICS_ROUTE}`, {
      waitUntil: 'domcontentloaded'
    });

    await sleep(DEFAULT_PAGE_LOAD_DELAY_MS);
    expect(page.url()).toEqual(`${WALLET_SOURCE_ORIGIN}/create`);
  });

  it(`should navigate to home page when navigating to ${CHECK_MNEMONICS_ROUTE}`, async () => {
    await page.goto(`${WALLET_SOURCE_ORIGIN}${CHECK_MNEMONICS_ROUTE}`, {
      waitUntil: 'domcontentloaded'
    });

    await sleep(DEFAULT_PAGE_LOAD_DELAY_MS);
    expect(page.url()).toEqual(`${WALLET_SOURCE_ORIGIN}/`);
  });

  it(`should navigate to home page when navigating to ${SET_PASSWORD_ROUTE}`, async () => {
    await page.goto(`${WALLET_SOURCE_ORIGIN}${SET_PASSWORD_ROUTE}`, {
      waitUntil: 'domcontentloaded'
    });

    await sleep(DEFAULT_PAGE_LOAD_DELAY_MS);
    expect(page.url()).toEqual(`${WALLET_SOURCE_ORIGIN}/`);
  });

  it(`should navigate to home page when navigating to ${DOWNLOAD_ROUTE}`, async () => {
    await page.goto(`${WALLET_SOURCE_ORIGIN}${DOWNLOAD_ROUTE}`, {
      waitUntil: 'domcontentloaded'
    });

    await sleep(DEFAULT_PAGE_LOAD_DELAY_MS);
    expect(page.url()).toEqual(`${WALLET_SOURCE_ORIGIN}/`);
  });
});
