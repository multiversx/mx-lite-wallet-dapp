import { UserSecretKey } from 'lib';

type ParsedPemReturnType = {
  address: string;
  privateKey: string;
} | null;

const parsePemData = (pemFileText: string): ParsedPemReturnType => {
  try {
    const secretKey = UserSecretKey.fromPem(pemFileText);
    const address = secretKey.generatePublicKey().toAddress();
    const accountAddress = address.toBech32();

    return {
      address: accountAddress,
      privateKey: secretKey.hex()
    };
  } catch {
    return null;
  }
};

export const parsePem = (file: File | null): Promise<ParsedPemReturnType> => {
  if (!file) {
    return Promise.resolve(null);
  }

  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => {
      const fileContent = reader.result;
      const parsedContent = parsePemData(String(fileContent));
      resolve(parsedContent);
    };
    reader.onerror = () => {
      reject(null);
    };
    reader.readAsText(file);
  });
};
