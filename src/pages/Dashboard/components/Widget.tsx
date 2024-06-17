import { Card } from 'components/Card';
import { useIsWebProvider } from 'hooks';
import { WidgetType } from 'types/widget.types';

const getCallbackRoute = ({
  anchor,
  isWebProvider
}: {
  anchor?: string;
  isWebProvider?: boolean;
}) => {
  if (!isWebProvider) {
    return '';
  }

  const basePath = `${window.location.pathname}`;

  if (anchor) {
    return `${basePath}#${anchor}`;
  }

  return basePath;
};

export const Widget = ({
  title,
  description,
  reference,
  anchor,
  widget: MxWidget,
  props = {}
}: WidgetType) => {
  const { isWebProvider } = useIsWebProvider();
  const callbackRoute = anchor
    ? getCallbackRoute({ anchor, isWebProvider })
    : '';

  return (
    <Card
      title={title}
      description={description}
      reference={reference}
      anchor={anchor}
    >
      <MxWidget callbackRoute={callbackRoute} {...props} />
    </Card>
  );
};
