import { selectTypeaheadOption, within } from 'utils/testUtils';
import { mnemonic } from './accountData';

export const mnemonicWords = mnemonic.split(' \n');

export const setAndCheckMnemonicInput = async ({
  inputName,
  modal
}: {
  inputName: string;
  modal: HTMLElement;
}) => {
  const label = within(modal).getByTestId(`${inputName}Label`);
  const mnemonicIndex = parseInt(label.innerHTML);
  const mnemonicWord = mnemonicWords[mnemonicIndex - 1];

  const selectInput = await within(modal).findByLabelText(
    `Word ${mnemonicIndex}`
  );

  await selectTypeaheadOption({ selectInput, option: mnemonicWord });
};
