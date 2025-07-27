import * as mongoose from 'mongoose';
// NOTE: if only this thing worked i would have the dreams but noooooooooooooo
// mongoose choose to go v8 and the guy didn't update
// https://www.npmjs.com/package/mongoose-zod

// import { Product } from '@penny/shared-validation';
// id: z.string().uuid(),
// name: z.string().min(1, 'Name is required'),
// description: z.string().optional(),
// price: z.number().positive('Price must be a positive number'),
// createdAt: z.date(),
// updatedAt: z.date(),
export const ProductSchema = new mongoose.Schema({
  name: String,
  description: String,
  price: Number,
});
