// import zod
import { z } from 'zod';
export const loginSchema = z.object({
  username: z.string().min(3, 'Username must be at least 3 characters long'),
  password: z.string().min(6, 'Password must be at least 6 characters long'),
});

export const registrationSchema = z
  .object({
    email: z.string().email(),
    username: z.string().min(3, 'Username must be at least 3 characters long'),
    password: z.string().min(6, 'Password must be at least 6 characters long'),
    confirmPassword: z
      .string()
      .min(6, 'Confirm Password must be at least 6 characters long'),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
  });

export const UserSchema = z.object({
  id: z.string().uuid(),
  email: z.string().email(),
  username: z.string().min(3, 'Username must be at least 3 characters long'),
  createdAt: z.date(),
  updatedAt: z.date(),
});

// export types
export type LoginType = z.infer<typeof loginSchema>;
export type RegistrationType = z.infer<typeof registrationSchema>;
export type User = z.infer<typeof UserSchema>;
