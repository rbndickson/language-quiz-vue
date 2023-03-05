export function shuffle<T>(array: T[]): T[] {
  // ref: https://en.wikipedia.org/wiki/Fisher%E2%80%93Yates_shuffle

  const newArray = [...array];

  for (let i = newArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
  }

  return newArray;
}

export function sample<T>(array: T[]): T {
  return array[Math.floor(Math.random() * array.length)];
}

export function emojiSvgUrl(emojiCode: string) {
  const twemojiSvgBaseUrl =
    "https://cdnjs.cloudflare.com/ajax/libs/twemoji/14.0.2/svg/";

  return `${twemojiSvgBaseUrl}${emojiCode}.svg`;
}
