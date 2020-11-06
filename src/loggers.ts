export const logErrorAndContinue = (err: Error): void => {
  console.error(`⚠️`, err.stack);
};

export const logErrorAndExit = (err: Error): void => {
  console.error(`❌`, err.stack);
  process.exit(1);
};
