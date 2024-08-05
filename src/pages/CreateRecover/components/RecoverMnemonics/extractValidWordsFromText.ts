export const extractValidWordsFromText = (
  text: string,
  mnemonicWords: string[]
) => {
  const lines = text.match(/\S+/g) || [];
  const validWords: string[] = [];

  if (lines.length > 0) {
    try {
      lines.forEach((line) => {
        // extrat only the valid word
        const candidateWords = line
          .split(' ')
          .filter((item) => item !== '')
          .filter((item) => isNaN(parseInt(item)));

        candidateWords.forEach((word) => {
          if (mnemonicWords.includes(word)) {
            validWords.push(word);
          }
        });
      });
    } catch (err) {}
  }

  return validWords;
};
