export enum NodeEnvs {
  Dev = 'development',
  Test = 'test',
  Production = 'production',
}

export const corsOptions = {
  ...(process.env.DEV_CLIENT_URL
    ? {
        origin: process.env.DEV_CLIENT_URL,
      }
    : {}),
  credentials: true,
};
