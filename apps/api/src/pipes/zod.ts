// zod-validation.pipe.ts
import {
  PipeTransform,
  ArgumentMetadata,
  BadRequestException,
} from '@nestjs/common';
// BUG: I give up on this one, will fix later
// import { ZodSchema } from 'zod'; // ✅ Correct type

export class ZodValidationPipe implements PipeTransform {
  // BUG: I give up on this one, will fix later
  constructor(private schema: any) {} // ✅ Accepts any Zod schema

  transform(value: unknown, metadata: ArgumentMetadata) {
    console.log('ZodValidationPipe', value, metadata);
    const result = this.schema.safeParse(value);
    if (result.success) {
      return result.data;
    } else {
      // choose the first error for simplicity

      throw new BadRequestException({
        message: 'Validation failed',
        errors: result.error.errors,
      });
    }
  }
}
