import { PropsWithChildren } from 'react';
import { useGetNetworkConfig } from '../sdkDapp.hooks';
import { MvxExplorerLink } from '../../sdkDappCoreUI/sdkDappCoreUI.components';
import { WithClassnameType } from 'types';

export const ExplorerLink = ({
  children,
  page,
  className,
  'data-testid': dataTestId
}: ExplorerLinkPropsType) => {
  const { network } = useGetNetworkConfig();

  return (
    <MvxExplorerLink
      link={`${network.explorerAddress}${page}`}
      class={className}
      dataTestId={dataTestId}
    >
      {children ? <span slot='content'>{children}</span> : null}
    </MvxExplorerLink>
  );
};

export interface ExplorerLinkPropsType extends WithClassnameType, PropsWithChildren {
  page: string;
} 