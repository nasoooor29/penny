import { z } from 'zod';

export const ProductSchema = z.object({
  _id: z.string(),
  name: z.string().min(1, 'Name is required'),
  description: z.string().optional(),
  price: z.number().positive('Price must be a positive number'),
  createdAt: z.date(),
  updatedAt: z.date(),
});
// create product DTO
export const CreateProductDtoSchema = ProductSchema.omit({
  _id: true,
  createdAt: true,
  updatedAt: true,
});
// update product DTO
export const UpdateProductDtoSchema = CreateProductDtoSchema.partial();

export type Product = z.infer<typeof ProductSchema>;
export type CreateProductDto = z.infer<typeof CreateProductDtoSchema>;
export type UpdateProductDto = z.infer<typeof UpdateProductDtoSchema>;
