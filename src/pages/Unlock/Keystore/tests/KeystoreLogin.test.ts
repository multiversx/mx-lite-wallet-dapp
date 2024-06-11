import { expectDashboardRoute, keystoreLogin } from 'utils/testUtils';

describe('Keystore login test', () => {
  it('should login with keystore file', async () => {
    const render = await keystoreLogin();
    await expectDashboardRoute({ render });
  });
});
