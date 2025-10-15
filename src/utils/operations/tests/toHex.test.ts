import { stringToHex, numberToHex } from '../toHex';

describe('stringToHex', () => {
  it('should convert a string to hex', () => {
    expect(stringToHex('Hello')).toBe('48656c6c6f');
    expect(stringToHex('123')).toBe('313233');
    expect(stringToHex('!@#')).toBe('214023');
  });

  it('should return empty string for undefined input', () => {
    expect(stringToHex(undefined)).toBe('');
  });

  it('should handle empty string', () => {
    expect(stringToHex('')).toBe('');
  });
});

describe('numberToHex', () => {
  it('should convert numbers to hex', () => {
    expect(numberToHex(255)).toBe('ff');
    expect(numberToHex(16)).toBe('10');
    expect(numberToHex(0)).toBe('0');
  });

  it('should handle string numbers', () => {
    expect(numberToHex('255')).toBe('ff');
    expect(numberToHex('16')).toBe('10');
    expect(numberToHex('0')).toBe('0');
  });

  it('should handle large numbers', () => {
    expect(numberToHex('1000000')).toBe('f4240');
    expect(numberToHex(1000000)).toBe('f4240');
  });
});
