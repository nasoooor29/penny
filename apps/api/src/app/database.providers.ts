import * as mongoose from 'mongoose';
import { env } from '@penny/shared-validation';

export const databaseProviders = [
  {
    provide: 'DATABASE_CONNECTION',
    useFactory: (): Promise<typeof mongoose> => mongoose.connect(env.DB_URI),
  },
];
