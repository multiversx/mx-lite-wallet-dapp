import { MvxCopyButton } from '../../sdkDappCoreUI/sdkDappCoreUI.components';
import { MvxCopyButtonPropsType } from '../../sdkDappCoreUI/sdkDappCoreUI.types';

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