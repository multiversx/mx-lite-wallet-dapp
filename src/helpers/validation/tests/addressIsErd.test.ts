import { addressIsErd } from '../addressIsErd';

describe('addressIsErd tests', () => {
  it('returns true for valid MultiversX addresses starting with erd', () => {
    const validAddress =
      'erd1qyu5wthldzr8wx5c9ucg8kjagg0jfs53s8nr3zpz3hypefsdd8ssycr6th';
    expect(addressIsErd(validAddress)).toBe(true);
  });

  it('returns false for invalid addresses', () => {
    expect(addressIsErd('invalid-address')).toBe(false);
    expect(addressIsErd('')).toBe(false);
    expect(addressIsErd(null as any)).toBe(false);
    expect(addressIsErd(undefined as any)).toBe(false);
  });

  it('returns false for Ethereum addresses', () => {
    const ethAddress = '0x71C7656EC7ab88b098defB751B7401B5f6d8976F';
    expect(addressIsErd(ethAddress)).toBe(false);
  });

  it('returns false for addresses that are similar to bech32 but not MultiversX', () => {
    const nonErdAddress =
      'xrd1qyu5wthldzr8wx5c9ucg8kjagg0jfs53s8nr3zpz3hypefsdd8ssycr6th';
    expect(addressIsErd(nonErdAddress)).toBe(false);
  });
});
