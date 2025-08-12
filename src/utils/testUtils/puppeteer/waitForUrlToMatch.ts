import {
  DEFAULT_DELAY_MS,
  DEFAULT_PAGE_LOAD_DELAY_MS
} from '__mocks__/data/constants';
import { sleep } from 'utils/testUtils/puppeteer/sleep';

/**
 * Waits for the page's URL to start with the expected URL
 * @param expectedUrl Expected URL
 * @param timeout Timeout in ms (default: 5000)
 */
export async function waitForUrlToMatch({
  expectedUrl,
  timeout = DEFAULT_PAGE_LOAD_DELAY_MS * 3
}: {
  expectedUrl: string;
  timeout?: number;
}) {
  const start = Date.now();

  while (Date.now() - start < timeout) {
    const currentUrl = page.url();
    const isUrlMatch = currentUrl.startsWith(expectedUrl);

    if (isUrlMatch) {
      return currentUrl;
    }

    await sleep(DEFAULT_DELAY_MS);
  }

  throw new Error(
    `Timeout: URL did not match any of the expected URLs within ${timeout}ms. Last URL: ${page.url()}`
  );
}
