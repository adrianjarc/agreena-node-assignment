export default () => ({
  database: {
    type: process.env.DATABASE_TYPE.toLowerCase(),
    host: process.env.DATABASE_HOST,
    port: process.env.DATABASE_PORT,
    user: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
    db: process.env.DATABASE_DB,
    runMigrations: process.env.DATABASE_RUN_MIGRATIONS === 'true',
  },
});
