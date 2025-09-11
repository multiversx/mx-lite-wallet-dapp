// prettier-ignore
export const styles = {
  signSuccessContainer: 'sign-success-container flex flex-col gap-6',
  signSuccess: 'sign-success flex flex-col w-[calc(100%-50px)]',
  signatureContainer: 'signature-container flex flex-row w-full gap-2',
  signatureText: 'signature-text w-full resize-none outline-none bg-transparent',
  encodedMessageContainer: 'encoded-message-container flex flex-row w-full gap-2',
  decodedMessageContainer: 'decoded-message-container flex flex-row w-full gap-2',
  decodedMessageText: 'resize-none outline-none text-green-700 bg-transparent'
} satisfies Record<string, string>;
