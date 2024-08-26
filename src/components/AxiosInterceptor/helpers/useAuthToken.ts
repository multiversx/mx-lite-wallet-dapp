import { useEffect, useState } from 'react';
import axios from 'axios';
import moment from 'moment';
import { useSelector } from 'react-redux';
import { storage } from 'lib';
import { ACCESS_TOKEN_KEY } from 'localConstants';
import { networkSelector } from 'redux/selectors';

type ObserversType = Array<(token?: string) => void>;

let observerdToken: string | undefined = undefined;
let observers: ObserversType = [];

const setObserverdToken = (token: string | undefined) => {
  observerdToken = token;
  observers.forEach((update) => update(observerdToken));

  if (!token) {
    storage.local.removeItem(ACCESS_TOKEN_KEY);
    return;
  }

  const in2Hours = moment().add(2, 'hours').unix();
  storage.local.setItem({
    key: ACCESS_TOKEN_KEY,
    data: token,
    expires: in2Hours
  });
};

export const useAuthToken = () => {
  const [token, setToken] = useState<string | undefined>(observerdToken);
  const {
    activeNetwork: { extrasApi }
  } = useSelector(networkSelector);

  useEffect(() => {
    observers.push(setToken);
    const currentToken = storage.local.getItem(ACCESS_TOKEN_KEY);
    setObserverdToken(currentToken);

    return () => {
      // Cleanup on unmount
      observers = observers.filter((update) => update !== setToken);
    };
  }, []);

  const fetchToken = async (newExtrasApi?: string) => {
    try {
      const { data: newToken } = await axios.get(
        `${newExtrasApi || extrasApi}/access`
      );

      setObserverdToken(newToken);
      return newToken;
    } catch (err) {
      console.error(err);
    }
  };

  return {
    fetchToken,
    setToken: setObserverdToken,
    token
  };
};
