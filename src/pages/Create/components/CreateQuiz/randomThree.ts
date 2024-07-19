export const randomThree = (array: string[]): string[] => {
  const newArray: string[] = [];
  while (newArray.length < 3) {
    const randomIndex = Math.floor(Math.random() * array.length);
    const newElement = array[randomIndex];
    if (!newArray.includes(newElement)) {
      newArray.push(newElement);
    }
  }
  return newArray;
};
