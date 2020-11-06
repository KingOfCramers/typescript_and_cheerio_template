export default (x: any[]) => x.filter((y, i, self) => self.indexOf(y) === i);
