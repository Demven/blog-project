require ('envkey');
const fs = require('fs');
const path = require('path');

const TARGET_PATH = path.join(process.cwd(), 'server/environments/index.ts');

const envConfigFile = `
export const env = {
  CMS_HOST: '${process.env.CMS_HOST}',
  JWT_SECRET: '${process.env.JWT_SECRET}',
  MONGODB_APP_NAME: '${process.env.MONGODB_APP_NAME}',
  MONGODB_HOST: '${process.env.MONGODB_HOST}',
  MONGODB_PASSWORD: '${process.env.MONGODB_PASSWORD}',
  MONGODB_PORT: '${process.env.MONGODB_PORT}',
  MONGODB_USERNAME: '${process.env.MONGODB_USERNAME}',
  NODE_ENV: '${process.env.NODE_ENV}',
  SENTRY_DSN_CLIENT: '${process.env.SENTRY_DSN_CLIENT}',
  SENTRY_DSN_SERVER: '${process.env.SENTRY_DSN_SERVER}',
  WWW_HOST: '${process.env.WWW_HOST}',
  YANDEX_ID: '${process.env.YANDEX_ID}',
};
`;

fs.writeFileSync(TARGET_PATH, envConfigFile, error => {
  if (error) {
    console.error(error);
  }

  console.info(`Environment variables generated into server/environments/index.ts`);
});
