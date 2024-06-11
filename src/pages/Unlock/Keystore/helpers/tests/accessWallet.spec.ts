import { accessWallet } from '../accessWallet';

const REACT_APP_KEYSTORE =
  '{"version":4,"id":"a1bb46ff-102e-4a00-8122-3ff9908b85f8","address":"75cb87c24351a67b892f57dcec0eb2b2a07aafab2f1aab741a10fc61059f2fe8","bech32":"erd1wh9c0sjr2xn8hzf02lwwcr4jk2s84tat9ud2kaq6zr7xzpvl9l5q8awmex","crypto":{"ciphertext":"18d9bd1bb62add7c7077a721a61412ddb27fefabff1129866a28d4f0079100ed89b23ba6bf652355000ff2578e667f5c13416776857ca938d7e7b005248a9965","cipherparams":{"iv":"595827fb024b75120f758d05a54bf1d4"},"cipher":"aes-128-ctr","kdf":"scrypt","kdfparams":{"dklen":32,"salt":"f7c840869099fb8f2f0a3c3f6dcf3982ef8996edc8aeb696961f3d93bf78c9c3","n":4096,"r":8,"p":1},"mac":"c0bb428eb44092a812b5f32e5821beabb7a92d6c0c9f84109920955b1ddd56d0"}}';
const REACT_APP_PASSWORD = 'P@ssw0rd123';

describe('accessWallet tests', () => {
  it('decodes keystore file', () => {
    const { success, privateKey, accountAddress } = accessWallet({
      kdContent: JSON.parse(REACT_APP_KEYSTORE),
      accessPassVal: REACT_APP_PASSWORD,
      t: (a) => a,
      index: 0
    });
    expect(success).toStrictEqual(true);
    expect(privateKey).toStrictEqual(
      '11035d3509a8010c074561800d1288ff1b7a2de7349f94e7ca087280788c6006'
    );
    expect(accountAddress).toStrictEqual(
      'erd1wh9c0sjr2xn8hzf02lwwcr4jk2s84tat9ud2kaq6zr7xzpvl9l5q8awmex'
    );
  });
});
