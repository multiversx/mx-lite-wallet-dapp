import { PropsWithChildren } from 'react';
import { MvxExplorerLink } from '@multiversx/sdk-dapp-ui/react';
import { useGetNetworkConfig } from 'lib';
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

export interface ExplorerLinkPropsType
  extends WithClassnameType,
    PropsWithChildren {
  page: string;
}
