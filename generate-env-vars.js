require ('envkey');
const fs = require('fs');
const path = require('path');

const TARGET_PATH = path.join(process.cwd(), 'src/environments/index.ts');

const envConfigFile = `
export const env = {
  NODE_ENV: '${process.env.NODE_ENV}',
  WWW_HOST: '${process.env.WWW_HOST}',
  YANDEX_ID: '${process.env.YANDEX_ID}',
};
`;

fs.writeFileSync(TARGET_PATH, envConfigFile, error => {
  if (error) {
    console.error(error);
  }

  console.info(`Environment variables generated into src/environments/index.ts`);
});
