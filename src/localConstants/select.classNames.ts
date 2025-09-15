export const SELECT_CLASSNAMES = {
  control: () =>
    '!text-sm !bg-secondary !text-primary !border-secondary !rounded-xl',
  placeholder: () => '!text-secondary',
  singleValue: () => '!text-primary',
  menu: () => '!bg-secondary border !border-secondary !rounded-xl px-1',
  option: ({ isFocused, isSelected }) =>
    [
      '!cursor-pointer !text-sm ',
      isFocused
        ? '!bg-primary !text-accent !rounded-lg'
        : '!bg-secondary !text-secondary',
      isSelected ? '!bg-primary !text-accent' : ''
    ].join(' '),
  input: () => '!text-primary'
};
