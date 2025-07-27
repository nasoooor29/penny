import { Environment, EnvironmentSchema } from './env.schema';

export const env: Environment = EnvironmentSchema.parse({
  apiBaseUrl: 'http://localhost:3000',
  appName: 'Penny',
  NODE_ENV: 'development',
  PORT: 4200,
  DB_URI:
    'mongodb+srv://nasoooor29:qqeAUidzfO248YTR@cluster0.rsnla7m.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0',
  SECRET_KEY: 'secret-key',
});
