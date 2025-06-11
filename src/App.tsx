import { Provider } from 'react-redux';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { PersistGate } from 'redux-persist/integration/react';
import { AxiosInterceptor, Layout, Utilities } from 'components';

import { PageNotFound, Unlock } from 'pages';
import { routeNames, routes } from 'routes';
import { BatchTransactionsContextProvider } from 'wrappers';
import { useSetupHrp } from './hooks';
import { persistor, store } from './redux/store';

const AppContent = () => {
  useSetupHrp();

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
  return (
    <AxiosInterceptor>
      <BatchTransactionsContextProvider>
        <AppContent />
      </BatchTransactionsContextProvider>
    </AxiosInterceptor>
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
