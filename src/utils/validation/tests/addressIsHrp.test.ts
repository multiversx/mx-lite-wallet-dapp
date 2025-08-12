import { addressIsHrp } from '../addressIsHrp';

describe('addressIsHrp tests', () => {
  it('returns true for valid MultiversX addresses starting with erd', () => {
    const validAddress =
      'erd1qyu5wthldzr8wx5c9ucg8kjagg0jfs53s8nr3zpz3hypefsdd8ssycr6th';
    expect(addressIsHrp(validAddress)).toBe(true);
  });

  it('returns false for invalid addresses', () => {
    expect(addressIsHrp('invalid-address')).toBe(false);
    expect(addressIsHrp('')).toBe(false);
    expect(addressIsHrp(null as any)).toBe(false);
    expect(addressIsHrp(undefined as any)).toBe(false);
  });

  it('returns false for Ethereum addresses', () => {
    const ethAddress = '0x71C7656EC7ab88b098defB751B7401B5f6d8976F';
    expect(addressIsHrp(ethAddress)).toBe(false);
  });

  it('returns false for addresses that are similar to bech32 but not MultiversX', () => {
    const nonErdAddress =
      'xrd1qyu5wthldzr8wx5c9ucg8kjagg0jfs53s8nr3zpz3hypefsdd8ssycr6th';
    expect(addressIsHrp(nonErdAddress)).toBe(false);
  });

  describe('Contract address tests', () => {
    it('returns true for valid contract addresses starting with erd1qqqqqqqq', () => {
      const validContractAddress =
        'erd1qqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqq6gq4hu';
      expect(addressIsHrp(validContractAddress)).toBe(true);
    });

    it('returns true for various valid contract addresses', () => {
      const contractAddresses = [
        'erd1qqqqqqqqqqqqqpgqhwsytpz5q57my2ns4t2pml3r22xt9p8fcxuqnjl23z',
        'erd1qqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqq6gq4hu'
      ];

      contractAddresses.forEach((address) => {
        expect(addressIsHrp(address)).toBe(true);
      });
    });

    it('returns false for invalid contract-like addresses', () => {
      // Contract address with wrong patterns or invalid format
      const invalidContractAddresses = [
        'erd1qqqqqqqqqqqqq', // Too short
        'erd1qqqqqqqqqqqqqpgqhwsytpz5q57my2ns4t2pml3r22xt9p8fcxuqnjl23zextra', // Too long
        'erd1qqqqqqqqqqqqqpgqhwsytpz5q57my2ns4t2pml3r22xt9p8fcxuqnjl23', // Wrong checksum length
        'erd1qqqqqqqqqqqqqpgqhwsytpz5q57my2ns4t2pml3r22xt9p8fcxuqnjl23O' // Invalid character (uppercase O)
      ];

      invalidContractAddresses.forEach((address) => {
        expect(addressIsHrp(address)).toBe(false);
      });
    });

    it('returns false for addresses that look like contracts but have wrong prefix', () => {
      const nonErdContractAddress =
        'xrd1qqqqqqqqqqqqqpgqhwsytpz5q57my2ns4t2pml3r22xt9p8fcxuqnjl23z';
      expect(addressIsHrp(nonErdContractAddress)).toBe(false);
    });

    it('validates contract addresses with different HRP values', () => {
      const contractAddress =
        'erd1qqqqqqqqqqqqqpgqhwsytpz5q57my2ns4t2pml3r22xt9p8fcxuqnjl23z';

      // Should return true for 'erd' HRP
      expect(addressIsHrp(contractAddress, 'erd')).toBe(true);

      // Should return false for other HRP values
      expect(addressIsHrp(contractAddress, 'btc')).toBe(false);
      expect(addressIsHrp(contractAddress, 'eth')).toBe(false);
      expect(addressIsHrp(contractAddress, 'custom')).toBe(false);
    });

    it('handles mixed wallet and contract address validation', () => {
      const walletAddress =
        'erd1qyu5wthldzr8wx5c9ucg8kjagg0jfs53s8nr3zpz3hypefsdd8ssycr6th';
      const contractAddress =
        'erd1qqqqqqqqqqqqqpgqhwsytpz5q57my2ns4t2pml3r22xt9p8fcxuqnjl23z';

      // Both should be valid with default 'erd' HRP
      expect(addressIsHrp(walletAddress)).toBe(true);
      expect(addressIsHrp(contractAddress)).toBe(true);

      // Both should be valid with explicit 'erd' HRP
      expect(addressIsHrp(walletAddress, 'erd')).toBe(true);
      expect(addressIsHrp(contractAddress, 'erd')).toBe(true);

      // Both should be false with different HRP
      expect(addressIsHrp(walletAddress, 'custom')).toBe(false);
      expect(addressIsHrp(contractAddress, 'custom')).toBe(false);
    });

    it('distinguishes between wallet and contract addresses by pattern', () => {
      const walletAddress =
        'erd1qyu5wthldzr8wx5c9ucg8kjagg0jfs53s8nr3zpz3hypefsdd8ssycr6th';
      const contractAddress =
        'erd1qqqqqqqqqqqqqpgqhwsytpz5q57my2ns4t2pml3r22xt9p8fcxuqnjl23z';

      // Both are valid addresses
      expect(addressIsHrp(walletAddress)).toBe(true);
      expect(addressIsHrp(contractAddress)).toBe(true);

      // Contract address should start with multiple q's after erd1
      expect(contractAddress.startsWith('erd1qqqqqqqq')).toBe(true);
      expect(walletAddress.startsWith('erd1qqqqqqqq')).toBe(false);
    });

    it('validates edge cases for contract addresses', () => {
      // Contract address with valid pattern
      const validContractPattern =
        'erd1qqqqqqqqqqqqqpgqhwsytpz5q57my2ns4t2pml3r22xt9p8fcxuqnjl23z';
      expect(addressIsHrp(validContractPattern)).toBe(true);

      // Invalid cases
      expect(addressIsHrp('')).toBe(false);
      expect(addressIsHrp('erd1')).toBe(false);
      expect(addressIsHrp('erd1q')).toBe(false);
      expect(addressIsHrp('erd1qqq')).toBe(false);
    });
  });

  describe('HRP parameter tests', () => {
    const validAddress =
      'erd1qyu5wthldzr8wx5c9ucg8kjagg0jfs53s8nr3zpz3hypefsdd8ssycr6th';

    it('uses default hrp "erd" when no hrp parameter is provided', () => {
      expect(addressIsHrp(validAddress)).toBe(true);
      expect(addressIsHrp(validAddress, 'erd')).toBe(true);
    });

    it('returns true when valid address matches the specified hrp', () => {
      expect(addressIsHrp(validAddress, 'erd')).toBe(true);
    });

    it('returns false when valid address does not match the specified hrp', () => {
      expect(addressIsHrp(validAddress, 'btc')).toBe(false);
      expect(addressIsHrp(validAddress, 'eth')).toBe(false);
      expect(addressIsHrp(validAddress, 'xrd')).toBe(false);
      expect(addressIsHrp(validAddress, 'cosmos')).toBe(false);
    });

    it('works with custom hrp values for valid bech32 addresses', () => {
      // Test with different custom HRP values
      expect(addressIsHrp(validAddress, 'custom')).toBe(false);
      expect(addressIsHrp(validAddress, 'test')).toBe(false);
      expect(addressIsHrp(validAddress, 'dev')).toBe(false);
    });

    it('handles case sensitivity in hrp parameter', () => {
      expect(addressIsHrp(validAddress, 'ERD')).toBe(false);
      expect(addressIsHrp(validAddress, 'Erd')).toBe(false);
      expect(addressIsHrp(validAddress, 'erd')).toBe(true);
    });

    it('returns false for invalid addresses regardless of hrp parameter', () => {
      expect(addressIsHrp('invalid-address', 'erd')).toBe(false);
      expect(addressIsHrp('invalid-address', 'custom')).toBe(false);
      expect(addressIsHrp('', 'erd')).toBe(false);
      expect(addressIsHrp('', 'custom')).toBe(false);
    });

    it('handles edge cases with hrp parameter', () => {
      // Empty hrp
      expect(addressIsHrp(validAddress, '')).toBe(true);

      // Very long hrp
      const longHrp = 'verylonghrpthatisunlikelytomatch';
      expect(addressIsHrp(validAddress, longHrp)).toBe(false);

      // Single character hrp
      expect(addressIsHrp(validAddress, 'e')).toBe(true); // 'erd' starts with 'e'
      expect(addressIsHrp(validAddress, 'x')).toBe(false);

      // Numeric hrp
      expect(addressIsHrp(validAddress, '123')).toBe(false);

      // Special characters in hrp
      expect(addressIsHrp(validAddress, 'er-d')).toBe(false);
      expect(addressIsHrp(validAddress, 'er_d')).toBe(false);
    });

    it('maintains backward compatibility with existing behavior', () => {
      const erdAddress =
        'erd1qyu5wthldzr8wx5c9ucg8kjagg0jfs53s8nr3zpz3hypefsdd8ssycr6th';
      const nonErdAddress =
        'xrd1qyu5wthldzr8wx5c9ucg8kjagg0jfs53s8nr3zpz3hypefsdd8ssycr6th';

      // Default behavior (without hrp parameter)
      expect(addressIsHrp(erdAddress)).toBe(true);
      expect(addressIsHrp(nonErdAddress)).toBe(false);

      // Explicit 'erd' hrp should match default behavior
      expect(addressIsHrp(erdAddress, 'erd')).toBe(addressIsHrp(erdAddress));
      expect(addressIsHrp(nonErdAddress, 'erd')).toBe(
        addressIsHrp(nonErdAddress)
      );
    });
  });
});
