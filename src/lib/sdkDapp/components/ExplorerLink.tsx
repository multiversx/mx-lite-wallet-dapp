import { PropsWithChildren } from 'react';
import { WithClassnameType } from 'types';
import { MvxExplorerLink } from '../../sdkDappCoreUI/sdkDappCoreUI.components';
import { useGetNetworkConfig } from '../sdkDapp.hooks';

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

export interface ExplorerLinkPropsType
  extends WithClassnameType,
    PropsWithChildren {
  page: string;
}
