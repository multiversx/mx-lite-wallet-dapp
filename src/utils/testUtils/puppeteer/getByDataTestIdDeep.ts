import { DEFAULT_PAGE_LOAD_DELAY_MS } from '__mocks__';
import { sleep } from './sleep';

/**
 * TODO: Import from @multiversx/sdk-dapp-ui when ready
 * Recursively searches the document and all shadow roots for the first element
 * matching the given data-testid.
 *
 * @param {import('puppeteer').Page} page - The Puppeteer Page instance.
 * @param {string} testId - The value of the data-testid attribute to search for.
 * @returns {Promise<ElementHandle|null>} - Handle to the found element, or null.
 */
export const getByTestIdDeep = async (page: any, dataTestId: string) => {
  await sleep(DEFAULT_PAGE_LOAD_DELAY_MS);
  const handle = await page.evaluateHandle((testId: string) => {
    /**
     * Walks a root node (Document or ShadowRoot) depth-first.
     * @param {ParentNode & (Document|ShadowRoot)} root
     */
    function walk(root: any): any {
      // Try to find in this root first
      const found = root.querySelector(`[data-testid="${testId}"]`);
      if (found) {
        return found;
      }
      // Traverse children to enter shadow roots
      const all: any[] = Array.from(root.querySelectorAll('*'));

      for (const el of all) {
        if (el.shadowRoot) {
          const inShadow = walk(el.shadowRoot);

          if (inShadow) {
            return inShadow;
          }
        }
      }
      return null;
    }
    return walk(document);
  }, dataTestId);

  // If nothing found, return null
  const element = handle.asElement();

  if (!element) {
    await handle.dispose();
    return null;
  }

  return element;
};
