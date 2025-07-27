// types/express-session.d.ts
import 'express-session';
import { Types } from 'mongoose';
import { UserSchema } from '../app/users.schema';

declare module 'express-session' {
  // NOTE: To have type safety for session data, we extend the SessionData interface.
  interface SessionData {
    user?: UserSchema;
    // user?: {
    //   id: Types.ObjectId;
    //   username: string;
    // };
  }
}
