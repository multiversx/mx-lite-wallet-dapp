import { getByDataTestId } from './getByDataTestId';

export const getElementTextContent = async ({
  dataTestId,
  parent = page
}: {
  dataTestId: string;
  parent?: typeof page;
}) => {
  const element: any = await parent.waitForSelector(
    getByDataTestId(dataTestId)
  );

  const elementTextContent = await element.getProperty('textContent');

  return elementTextContent.jsonValue();
};

export const expectElementToContainText = async ({
  dataTestId,
  parent = page,
  text
}: {
  dataTestId: string;
  parent?: typeof page;
  text: string;
}) => {
  const textContent = await getElementTextContent({ dataTestId, parent });

  return expect(textContent).toMatch(text);
};
