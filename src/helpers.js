export function shuffle(array) {
  // ref: https://en.wikipedia.org/wiki/Fisher%E2%80%93Yates_shuffle

  const newArray = [...array];

  for (let i = newArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
  }

  return newArray;
}

export function sample(array) {
  return array[Math.floor(Math.random() * array.length)];
}
