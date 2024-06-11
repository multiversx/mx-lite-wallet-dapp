import { RequestMessageType } from 'types';

// used for mocking since window.postMessage does not provide a prop to set the event origin
export const getEventOrigin = (event: MessageEvent<RequestMessageType>) => {
  return event.origin;
};
