export const getCompareObject = (
  shuffledArray: string[],
  mnemonicArray: string[]
) => {
  const compare = {
    first: {
      value: shuffledArray[0],
      label: mnemonicArray.indexOf(shuffledArray[0]) + 1
    },
    second: {
      value: shuffledArray[1],
      label: mnemonicArray.indexOf(shuffledArray[1]) + 1
    },
    third: {
      value: shuffledArray[2],
      label: mnemonicArray.indexOf(shuffledArray[2]) + 1
    }
  };
  return compare;
};
