import { MvxCopyButton, MvxCopyButtonPropsType } from 'lib/sdkDappUI';

export const CopyButton = ({
  className = 'ml-0.5 inline-block cursor-pointer px-1 hover:text-white text-gray-400',
  text
}: Partial<MvxCopyButtonPropsType>) => {
  return <MvxCopyButton class={className} text={text} />;
};
