export const unique = <T>(x: T[]): T[] =>
  x.filter((y, i, self) => self.indexOf(y) === i);

export const limitList = <T>(limit: number | undefined) => (
  val: T,
  index: number
) => (limit ? index + 1 <= limit : true);
