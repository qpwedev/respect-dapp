const adjectives: string[] = [
  "Majestic",
  "Brave",
  "Calm",
  "Delightful",
  "Eager",
  "Faithful",
  "Gentle",
  "Happy",
  "Jolly",
  "Kind",
  "Lively",
  "Proud",
  "Silly",
  "Witty",
  "Zany",
];

const nouns: string[] = [
  "Guide",
  "Pioneer",
  "Explorer",
  "Ninja",
  "Ranger",
  "Robot",
  "Guru",
  "Wizard",
  "Champion",
  "Professional",
  "Jester",
  "Detective",
  "Captain",
  "Pilot",
  "Companion",
];

const getRandomElement = (arr: string[]): string => {
  const randomIndex: number = Math.floor(Math.random() * arr.length);
  return arr[randomIndex];
};

export const generateName = (): string => {
  const adjective: string = getRandomElement(adjectives);
  const noun: string = getRandomElement(nouns);
  return `${adjective} ${noun}`;
};
