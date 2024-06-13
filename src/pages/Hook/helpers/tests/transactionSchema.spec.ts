describe('transactionSchema', () => {
  test('Data and TokenId not allowed', async () => {
    // TODO bring back
    // const isValid = await transactionSchema({
    //   t: (str: any) => str,
    //   isMainnet: false
    // }).isValid({
    //   receiver:
    //     testAccount.address,
    //   value: '0',
    //   gasLimit: '350000000',
    //   token: '1TOKEN-6aef93',
    //   data: 'ESDTTransfer@4c50542d316664386531@022b1c8c1227a00000',
    //   callbackUrl: 'http%3A%2F%2Flocalhost%3A5000%2Ftransaction%3Fcustom%3D1'
    // });
    //
    // expect(isValid).toBe(false);
  });
});

export {};
