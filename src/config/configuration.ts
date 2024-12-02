export default () => ({
  SERVER_PORT: parseInt(process.env.SERVER_PORT, 10) || 3001,
  DATABASE_HOST: process.env.DATABASE_HOST,
  DATABASE_PORT: parseInt(process.env.DATABASE_PORT, 10) || 5432,
  OLLAMA_HOST: process.env.OLLAMA_HOST,
});
