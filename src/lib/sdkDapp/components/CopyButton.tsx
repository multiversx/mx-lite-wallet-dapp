import { MvxCopyButton } from '@multiversx/sdk-dapp-core-ui/react';
import type { MvxCopyButton as MvxCopyButtonPropsType } from '@multiversx/sdk-dapp-core-ui/web-components/mvx-copy-button';

export const CopyButton = ({
  className,
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
