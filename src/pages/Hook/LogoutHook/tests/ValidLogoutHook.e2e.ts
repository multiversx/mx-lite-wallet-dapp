import { WALLET_SOURCE_ORIGIN } from '__mocks__';

describe('Valid logout hook tests', () => {
  it('should logout and navigate to callbackURl', async () => {
    await page.goto(
      `${WALLET_SOURCE_ORIGIN}/hook/logout?callbackUrl=https://devnet.xexchange.com/logout`,
      {
        waitUntil: 'domcontentloaded'
      }
    );

    expect(page.url()).toMatch('https://devnet.xexchange.com/logout');
  });
});
