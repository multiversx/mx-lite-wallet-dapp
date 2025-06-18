import { PropsWithChildren } from 'react';
import { MvxExplorerLink } from '@multiversx/sdk-dapp-core-ui/react';
import { getState, networkSelector } from 'lib';
import { WithClassnameType } from 'types';

export const ExplorerLink = ({
  children,
  page,
  className,
  'data-testid': dataTestId
}: ExplorerLinkPropsType) => {
  const network = networkSelector(getState());

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
