import {
  expectDashboardRoute,
  ledgerLogin,
  renderWithProviders
} from 'utils/testUtils';

export const ledgerLoginAndExpectDashboard = async () => {
  const render = await renderWithProviders();
  await ledgerLogin({ render });
  await expectDashboardRoute({ render });

  return render;
};
