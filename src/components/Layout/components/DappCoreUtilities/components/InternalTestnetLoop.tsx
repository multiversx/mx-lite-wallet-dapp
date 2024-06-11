import React from 'react';
import { useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';

import { sdkDappStore } from 'redux/sdkDapp.store';
import { networksSelector } from 'redux/selectors';
import { setWebsocketEvent } from 'redux/slices';
import { CustomEventsEnum, EnvironmentsEnum } from 'types';

const networksWithWs: string[] = Object.values(EnvironmentsEnum);
const refreshRate = 12 * 1000;

export const InternalTestnetLoop = () => {
  const { activeNetwork } = useSelector(networksSelector);
  const loopRef = useRef<NodeJS.Timeout>();
  const [hasWebsocket, setHasWebsocket] = useState(
    networksWithWs.includes(String(activeNetwork.id))
  );
  const ref = useRef(null);

  useEffect(() => {
    const activateLoop = () => {
      setHasWebsocket(false);
    };
    document.addEventListener(CustomEventsEnum.WS_FAILED, activateLoop);
    return () => {
      document.removeEventListener(CustomEventsEnum.WS_FAILED, activateLoop);
    };
  }, []);

  useEffect(() => {
    if (hasWebsocket) {
      return;
    }

    loopRef.current = setInterval(() => {
      if (ref.current) {
        sdkDappStore.dispatch(setWebsocketEvent('transactionCompleted'));
      }
    }, refreshRate);

    return () => {
      if (loopRef.current) {
        clearInterval(loopRef.current);
      }
    };
  }, [hasWebsocket]);

  return <div ref={ref} />;
};
