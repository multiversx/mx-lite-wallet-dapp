import { memo } from 'react';
import { Provider, useSelector } from 'react-redux';
import { Route, Routes, BrowserRouter as Router } from 'react-router-dom';

import { PersistGate } from 'redux-persist/integration/react';
import { provider } from 'helpers';
import { PageNotFound } from 'pages/PageNotFound';
import { activeNetworkSelector } from 'redux/selectors';
import { store, persistor } from 'redux/store';
import { EnvironmentsEnum } from 'types';

import {
  Layout,
  MainLayout,
  AxiosInterceptor,
  AxiosInterceptorContext,
  DappProvider,
  TransactionsTracker,
  DappCoreUtilities,
  WalletUtilities,
  ErrorBoundaryComponent
} from './components';
import { routeNames, routes } from './routes';

import './assets/sass/main.scss';

const RoutesComponent = memo(() => (
  <Routes>
    {routes.map((route, index) => (
      <Route
        key={route.path + index}
        path={route.path}
        element={<route.component />}
      >
        {route.nestedRoutes?.map((nestedRoute) => (
          <Route
            index={nestedRoute.path === ''}
            key={`${route.path}-${nestedRoute.path}`}
            path={nestedRoute.path}
            element={<nestedRoute.component />}
          />
        ))}
      </Route>
    ))}

    <Route
      path='*'
      element={
        <MainLayout>
          <PageNotFound />
        </MainLayout>
      }
    />
  </Routes>
));

const MainApp = () => {
  const network = useSelector(activeNetworkSelector);

  return (
    <AxiosInterceptorContext.Provider>
      <AxiosInterceptor>
        <DappProvider
          environment={EnvironmentsEnum.devnet}
          externalProvider={provider}
          dappConfig={{
            logoutRoute: routeNames.unlock
          }}
          customNetworkConfig={{
            ...network,
            skipFetchFromServer: true
          }}
          customComponents={{
            transactionTracker: {
              component: TransactionsTracker
            }
          }}
        >
          <Layout>
            <DappCoreUtilities />
            <WalletUtilities />
            <RoutesComponent />
          </Layout>
        </DappProvider>
      </AxiosInterceptor>
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
