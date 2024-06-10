import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Provider, useDispatch, useSelector } from 'react-redux';

import {
  AxiosInterceptorContext, // using this is optional
  DappProvider,
  Layout,
  TransactionsToastList,
  NotificationModal,
  SignTransactionsModals
  // uncomment this to use the custom transaction tracker
  // TransactionsTracker
} from 'components';

import {
  apiTimeout,
  walletConnectV2ProjectId,
  environment,
  sampleAuthenticatedDomains
} from 'config';
import { RouteNamesEnum } from 'localConstants';
import { PageNotFound, Unlock } from 'pages';
import { routes } from 'routes';
import { BatchTransactionsContextProvider } from 'wrappers';

const AppContent = () => {
  return (
    <DappProvider
      environment={environment}
      customNetworkConfig={{
        name: 'customConfig',
        apiTimeout,
        walletConnectV2ProjectId
      }}
      dappConfig={{
        shouldUseWebViewProvider: true,
        logoutRoute: RouteNamesEnum.unlock
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
          <TransactionsToastList />
          <NotificationModal />
          <SignTransactionsModals />
          <Routes>
            <Route path={RouteNamesEnum.unlock} element={<Unlock />} />
            {routes.map((route) => (
              <Route
                path={route.path}
                key={`route-key-'${route.path}`}
                element={<route.component />}
              />
            ))}
            <Route path='*' element={<PageNotFound />} />
          </Routes>
        </Layout>
      </AxiosInterceptorContext.Listener>
    </DappProvider>
  );
};

export const App = () => {
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
      <ErrorBoundaryComponent>
        <MainApp />
      </ErrorBoundaryComponent>
    </PersistGate>
  </Provider>
);

export const App = () => (
  <Router>
    <ProviderApp />
  </Router>
);
