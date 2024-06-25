import { Provider } from 'react-redux';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { PersistGate } from 'redux-persist/integration/react';

import {
  AxiosInterceptorContext,
  DappProvider,
  Layout,
  Utilities
} from 'components';

import {
  apiTimeout,
  walletConnectV2ProjectId,
  environment,
  sampleAuthenticatedDomains,
  API_URL
} from 'config';
import { provider } from 'helpers/app';
import { PageNotFound, Unlock } from 'pages';
import { routeNames, routes } from 'routes';
import { BatchTransactionsContextProvider } from 'wrappers';
import { persistor, store } from './redux/store';

const AppContent = () => {
  return (
    <DappProvider
      environment={environment}
      externalProvider={provider}
      customNetworkConfig={{
        name: 'customConfig',
        apiAddress: API_URL,
        apiTimeout,
        walletConnectV2ProjectId
      }}
      dappConfig={{
        logoutRoute: routeNames.unlock
      }}
      customComponents={{
        transactionTracker: {
          // uncomment this to use the custom transaction tracker
          // component: TransactionsTracker,
          props: {
            onSuccess: (sessionId: string) => {
              console.log(`Session ${sessionId} successfully completed`);
            },
            onFail: (sessionId: string, errorMessage: string) => {
              console.log(`Session ${sessionId} failed. ${errorMessage ?? ''}`);
            }
          }
        }
      }}
    >
      <AxiosInterceptorContext.Listener>
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
      </AxiosInterceptorContext.Listener>
    </DappProvider>
  );
};

export const MainApp = () => {
  return (
    <AxiosInterceptorContext.Provider>
      <AxiosInterceptorContext.Interceptor
        authenticatedDomains={sampleAuthenticatedDomains}
      >
        <BatchTransactionsContextProvider>
          <AppContent />
        </BatchTransactionsContextProvider>
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
