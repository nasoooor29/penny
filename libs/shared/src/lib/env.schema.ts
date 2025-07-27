import { z } from 'zod';

export const EnvironmentSchema = z.object({
  apiBaseUrl: z.string().url().or(z.string()).default('http://localhost:3000'), // url or relative path
  appName: z.string().default('MyApp'),
  NODE_ENV: z
    .enum(['development', 'production', 'test'])
    .default('development'),
  PORT: z.coerce.number().default(4200),
  DB_URI: z.string(),
  SECRET_KEY: z.string().default('my-secret'),
});

// Infer TS type from schema
export type Environment = z.infer<typeof EnvironmentSchema>;
