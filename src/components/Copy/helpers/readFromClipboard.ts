export const readFromClipboard = async () => {
  try {
    return navigator.clipboard.readText();
  } catch (error) {
    console.error(error);
  }

  try {
    const textareaElement = document.createElement('textarea');
    textareaElement.value = '';
    document.body.append(textareaElement);
    textareaElement.select();
    document.execCommand('paste');
    const text = textareaElement.value || '';
    textareaElement.remove();

    return text;
  } catch (error) {
    console.error(error);
  }

  return '';
};
