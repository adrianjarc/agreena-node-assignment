/* eslint-disable @typescript-eslint/no-var-requires */
const dotenv = require('dotenv');
const fs = require('fs');
/* eslint-enable @typescript-eslint/no-var-requires */

let config;

const filePath = `.env.local`;

/**
 * Try to load and parse the config file,
 * throw an error if the file doesn't exist
 */
if (!fs.existsSync(filePath)) {
  throw new Error(`Config file not found: ${filePath}`);
} else {
  config = dotenv.parse(fs.readFileSync(filePath));
  console.log(`[#] Loaded config from: ${filePath}`);
}

const getKey = (opt) => {
  return config[opt] ? config[opt] : process.env[opt];
};
const getConf = (opt) => {
  const key = getKey(opt);
  if (key == null || !key) {
    console.error(`[!] Config option ${opt} is missing`);
    console.error(
      `[!] Make sure that STAGE is set or that variables are loaded in your environment`,
    );
    process.exit(1);
  }

  return key;
};

const typeOrmConfig = {
  type: 'postgres',
  host: getConf('DATABASE_HOST'),
  port: Number(getConf('DATABASE_PORT')),
  username: getConf('DATABASE_USER'),
  password: getConf('DATABASE_PASSWORD'),
  database: getConf('DATABASE_DB'),
  entities: [__dirname + '/src/entities/*.entity{.ts,.js}'],
  migrations: [__dirname + '/src/migrations/*{.ts,.js}'],
};

module.exports = typeOrmConfig;
