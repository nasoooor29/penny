import * as mongoose from 'mongoose';
// NOTE: if only this thing worked i would have the dreams but noooooooooooooo
// mongoose choose to go v8 and the guy didn't update
// https://www.npmjs.com/package/mongoose-zod

// import { User } from '@penny/shared-validation';
// id: z.string().uuid(),
// email: z.string().email(),
// username: z.string().min(3, 'Username must be at least 3 characters long'),
// createdAt: z.date(),
// updatedAt: z.date(),
export const UserSchema = new mongoose.Schema({
  username: String,
  email: String,
  password: String,
});
