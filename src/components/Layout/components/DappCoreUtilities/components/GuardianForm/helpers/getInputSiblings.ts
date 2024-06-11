export const getInputSiblings = (target: EventTarget & HTMLInputElement) => {
  const inputParentElement = target.parentElement;

  const nextInputParentElement = inputParentElement
    ? <HTMLElement>inputParentElement.nextElementSibling
    : null;

  const previousInputParentElement = inputParentElement
    ? <HTMLElement>inputParentElement.previousElementSibling
    : null;

  const nextInputSibling = nextInputParentElement
    ? <HTMLElement>nextInputParentElement.firstChild
    : null;

  const previousInputSibling = previousInputParentElement
    ? <HTMLElement>previousInputParentElement.firstChild
    : null;

  return { nextInputSibling, previousInputSibling };
};
