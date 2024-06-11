import { mockWindowLocationHref } from '__mocks__';
import { buildWalletQueryString } from '../buildWalletQueryString';

describe('buildWalletQueryString', () => {
  beforeAll(() => {
    mockWindowLocationHref('https://example.com');
  });

  it('should return only callbackUrl when no params are provided', () => {
    const result = buildWalletQueryString({});
    expect(result).toBe('callbackUrl=https://example.com');
  });

  it('should handle simple parameters', () => {
    const params = { key1: 'value1', key2: 'value2' };
    const result = buildWalletQueryString({ params });
    expect(result).toBe(
      'key1=value1&key2=value2&callbackUrl=https://example.com'
    );
  });

  it('should correctly encode URL parameters', () => {
    const params = { key: 'value with spaces' };
    const result = buildWalletQueryString({ params });
    expect(result).toBe(
      'key=value%20with%20spaces&callbackUrl=https://example.com'
    );
  });

  it('should handle special characters in parameters', () => {
    const params = { key: 'value&with&special%characters?' };
    const result = buildWalletQueryString({ params });
    expect(result).toBe(
      'key=value%26with%26special%25characters%3F&callbackUrl=https://example.com'
    );
  });
});
