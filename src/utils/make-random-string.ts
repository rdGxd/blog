export const makeRandomString = (): string =>
  Math.random().toString(36).substring(2, 10);
