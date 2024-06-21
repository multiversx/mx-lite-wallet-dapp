export const calculateGasLimit = (data: string) => {
  const baseGasLimit = 50000;
  const dataLength = data ? data.length / 2 : 0;
  return baseGasLimit + dataLength * 1500;
};

export const calculateNftGasLimit = (data: string) => {
  return data ? data.length * 1500 + 50000 : 50000;
};
