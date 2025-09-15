// prettier-ignore
export const styles = {
  issueCollectionContainer: 'issue-collection-container d-flex flex-column',
  issueCollectionFields: 'issue-collection-fields flex flex-col gap-4 h-full',
  issueCollectionButtons: 'issue-collection-buttons mt-4 flex flex-col items-center',
  issueCollectionSendButton: 'issue-collection-send-button mt-4 mx-auto rounded-lg bg-btn-primary text-btn-primary font-normal text-sm px-6 h-12 cursor-pointer hover:opacity-75',
  issueCollectionInput: 'issue-collection-input block w-full p-2 text-sm text-primary font-normal bg-secondary transition-all duration-200 rounded-xl placeholder-neutral-500 border border-secondary',
  issueCollectionLabel: 'issue-collection-label text-lg font-medium text-secondary transition-all duration-200 ease-out block mb-2',
  issueCollectionOption: 'text-sm font-medium text-primary transition-all duration-200 ease-out mb-2',
  issueCollectionTokenTickerError: 'text-red-600 text-sm mt-1'
} satisfies Record<string, string>;
