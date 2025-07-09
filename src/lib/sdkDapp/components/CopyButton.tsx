import { MvxCopyButton } from '@multiversx/sdk-dapp-ui/react';
import type { MvxCopyButton as MvxCopyButtonPropsType } from '@multiversx/sdk-dapp-ui/web-components/mvx-copy-button';

export const CopyButton = ({
  className = 'ml-0.5 inline-block cursor-pointer px-1 hover:text-white text-gray-400',
  text,
  copyIcon,
  iconClass,
  successIcon
}: Partial<MvxCopyButtonPropsType>) => {
  return (
    <MvxCopyButton
      class={className}
      text={text}
      copyIcon={copyIcon}
      iconClass={iconClass}
      successIcon={successIcon}
    />
  );
};
