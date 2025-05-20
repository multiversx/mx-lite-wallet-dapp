import { useEffect } from 'react';
import { Provider, useDispatch, useSelector } from 'react-redux';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { PersistGate } from 'redux-persist/integration/react';

import {
  AxiosInterceptor,
  AxiosInterceptorContext,
  Layout,
  Utilities
} from 'components';

import { getWebviewToken } from 'lib';
import { PageNotFound, Unlock } from 'pages';
import { setIsWebview } from 'redux/slices';
import { routeNames, routes } from 'routes';
import { BatchTransactionsContextProvider } from 'wrappers';
import { useSetupHrp } from './hooks';
import { networkSelector } from './redux/selectors';
import { persistor, store } from './redux/store';

const isWebview = Boolean(getWebviewToken());

const AppContent = () => {
  useSetupHrp();

  const dispatch = useDispatch();

  useEffect(() => {
    if (isWebview) {
      dispatch(setIsWebview(true));
    }
  }, [isWebview]);

  return (
    <Layout>
      <Routes>
        <Route path={routeNames.unlock} element={<Unlock />} />
        {routes.map((route) => (
          <Route
            path={route.path}
            key={`route-key-'${route.path}`}
            element={<route.component />}
          />
        ))}
        <Route path='*' element={<PageNotFound />} />
      </Routes>
      <Utilities />
    </Layout>
  );
};

export const MainApp = () => {
  const { activeNetwork } = useSelector(networkSelector);

  return (
    <AxiosInterceptorContext.Provider>
      <AxiosInterceptorContext.Interceptor
        authenticatedDomains={activeNetwork.sampleAuthenticatedDomains}
      >
        <AxiosInterceptor>
          <BatchTransactionsContextProvider>
            <AppContent />
          </BatchTransactionsContextProvider>
        </AxiosInterceptor>
      </AxiosInterceptorContext.Interceptor>
    </AxiosInterceptorContext.Provider>
  );
};

export const ProviderApp = () => (
  <Provider store={store}>
    <PersistGate persistor={persistor} loading={null}>
      <MainApp />
    </PersistGate>
  </Provider>
);

export const App = () => (
  <Router>
    <ProviderApp />
  </Router>
);
