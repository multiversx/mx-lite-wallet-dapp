import { Provider } from 'react-redux';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { PersistGate } from 'redux-persist/integration/react';
import { AxiosInterceptor } from 'components/AxiosInterceptor';
import { Layout } from 'components/Layout';
import { Utilities } from 'components/Utilities';

import { PageNotFound } from 'pages';
import { routes } from 'routes';
import { persistor, store } from './redux/store';

const AppContent = () => {
  return (
    <Layout>
      <Routes>
        {routes.map((route) => (
          <Route
            key={`route-key-${route.path}`}
            path={route.path}
            element={<route.component />}
          >
            {route.children?.map((child) => (
              <Route
                key={`route-key-${route.path}-${child.path}`}
                path={child.path}
                element={<child.component />}
              />
            ))}
          </Route>
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
      <AppContent />
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
