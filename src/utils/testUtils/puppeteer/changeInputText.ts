import { getByDataTestId } from './getByDataTestId';

export const changeInputText = async ({
  dataTestId,
  parent = page,
  shouldOverride,
  text
}: {
  dataTestId: string;
  parent?: any;
  shouldOverride?: boolean;
  text: string;
}) => {
  const input = await parent.waitForSelector(getByDataTestId(dataTestId));

  if (!shouldOverride) {
    await input.type(text);

    return;
  }

  // Click 3 times to select the entire existing text and override it
  await input.click({ clickCount: 3 });
  await input.type(text);
};
